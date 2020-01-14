import { APIGatewayEvent } from 'aws-lambda';
import moment from 'moment';
import uuid from 'node-uuid';
import { getDocumentClient, ReservationRecord, TABLE_NAME } from './shared';

export default async function addReservation (event: APIGatewayEvent) {
  // This check is redundant but serves as a typeguard
  if (!event.queryStringParameters) return null;

  // Make a connection to the DynamoDB table
  const docClient = getDocumentClient();

  // Grab relevant request parameters
  const { name, start, end } = event.queryStringParameters;

  // Validate that the start and end are dates
  if (!moment(start).isValid() || !moment(end).isValid()) {
    return 'bad request';
  }

  const item: ReservationRecord = {
    end,
    id: uuid.v4(),
    name,
    start
  };

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  console.log('Adding a new item...');
  const x = await docClient.put(params, function(err) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added item:', JSON.stringify(item, null, 2));
    }
  }).promise();

  return 'success';
};
