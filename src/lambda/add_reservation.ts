import { APIGatewayEvent } from 'aws-lambda';
import moment from 'moment';
import uuid from 'node-uuid';

import { ReservationRecord } from '../shared';
import { error, getDocumentClient, respond, TABLE_NAME } from './shared';


export default async function addReservation (event: APIGatewayEvent) {
  // This check is redundant but serves as a typeguard
  if (!event.queryStringParameters) return respond(null);

  // Make a connection to the DynamoDB table
  const docClient = getDocumentClient();

  // Grab relevant request parameters
  const { end, name, notes, start } = event.queryStringParameters;

  // Validate that the start and end are dates
  if (!start || !end || !moment(start).isValid() || !moment(end).isValid()) {
    return error(400);
  }

  const item: ReservationRecord = {
    end,
    id: uuid.v4(),
    name,
    notes,
    start
  };

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  try {
    console.log('Adding a new item...');
    await docClient.put(params).promise();
    console.log('Added item:', JSON.stringify(item, null, 2));
    return respond(item);
  } catch (e) {
    console.error('Unable to add item. Error JSON:', JSON.stringify(e, null, 2));
    return error(400);
  }
};
