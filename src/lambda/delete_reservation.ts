import { APIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { error, getDocumentClient, respond, TABLE_NAME } from './shared';


export default async function deleteReservation (event: APIGatewayEvent) {
  // This check is redundant but serves as a typeguard
  if (!event.queryStringParameters) return respond(null);

  // Make a connection to the DynamoDB table
  const docClient = getDocumentClient();

  // Grab relevant request parameters
  const { id } = event.queryStringParameters;
  const params: DocumentClient.DeleteItemInput = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    console.log(`Trying to delete reservation with ID ${id}...`);
    const r = await docClient.delete(params).promise();
    console.log('Item deleted.');
    return respond('success');
  } catch (e) {
    console.error('Unable to delete item. Error:', JSON.stringify(e, null, 2));
    return error(404);
  }
}
