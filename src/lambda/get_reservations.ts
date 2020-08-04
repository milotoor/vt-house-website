import { APIGatewayEvent } from 'aws-lambda';
import { pick } from 'lodash';

import { error, getDocumentClient, ReservationRecord, respond, TABLE_NAME } from './shared';


export default async function getReservations (event: APIGatewayEvent) {
  // This check is redundant but serves as a typeguard
  if (!event.queryStringParameters) return respond(null);
  
  const response = await getDocumentClient()
    .scan(
      { TableName: TABLE_NAME },
      (err) => {
        if (err) {
          console.error('Unable to get reservations. Error JSON:', JSON.stringify(err, null, 2));
        }
      }
    ).promise();
  
  // Extract the reservations. The basic version is the subset of data everyone can access
  const reservations = (response.Items || []) as ReservationRecord[];
  const basicReservations = reservations.map(r => pick(r, ['start', 'end']));
  
  // Authenticate the user-- all users can access the start and end of the reservation, only admin
  // can access the rest of the reservation info
  const pw = process.env.PASSWORD;
  const { secret } = event.queryStringParameters;
  
  // We will return the reservation info in full if three conditions are met:
  //   1. A password has been set in the Lambda environment variables
  //   2. A secret was provided
  //   3. The secret and the password match
  //
  // If only (1) and (2) are met, we raise a 403 (HTTP forbidden) error because
  // the user is attempting to access privileged information but is not
  // providing the right password.
  if (typeof pw !== 'undefined' && typeof secret !== 'undefined') {
    return secret === pw
      ? respond(reservations)
      : error(403);
  } else {
    return respond(basicReservations);
  }
};
