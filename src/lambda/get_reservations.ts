import { DynamoDB } from 'aws-sdk'
import { getDocumentClient, TABLE_NAME } from './shared';

export default async function getReservations (): Promise<DynamoDB.ItemList> {
  const params = {
    TableName: TABLE_NAME
  };

  console.log('Adding a new item...');
  const response = await getDocumentClient().scan(params, function(err) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    }
  }).promise();

  return response.Items || [];
};
