import aws from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { AWSError } from 'aws-sdk/lib/error';
import uuid from 'node-uuid';

import { ReservationRecord } from './shared';


aws.config.update({ region: "us-west-2" });

/**
 * Manages all queries to DynamoDB
 */
export class DynamoDBManager {
  static TABLE_NAME = 'vt_reservations';

  /**
   * Returns a DynamoDB "Document Client"
   */
  get client () {
    return new aws.DynamoDB.DocumentClient();
  }

  /**
   * Attempts to delete a reservation record from DynamoDB given its ID
   *
   * @param {string} id: the ID of the reservation to delete
   */
  async delete (id: string) {
    const params: DocumentClient.DeleteItemInput = {
      TableName: DynamoDBManager.TABLE_NAME,
      Key: { id }
    };

    try {
      console.log(`Deleting reservation with ID ${id}...`);
      await this.client.delete(params).promise();
      console.log('Item deleted.');
      return false;
    } catch (e) {
      console.error('Unable to delete item. Error:', JSON.stringify(e, null, 2));
      return e;
    }
  }

  /**
   * Queries DynamoDB for all reservation records
   */
  async get () {
    const input: DocumentClient.ScanInput = {
      TableName: DynamoDBManager.TABLE_NAME
    };

    const response = await this.client.scan(input, handleError).promise();
    return (response.Items || []) as ReservationRecord[];

    function handleError (err: AWSError) {
      if (err) {
        console.error('Unable to get reservations. Error JSON:', JSON.stringify(err, null, 2));
      }
    }
  }

  /**
   * Updates an existing reservation record or creates a new one if none with
   * the given `id` exist
   *
   * @param {string} start: the reservation's starting date
   * @param {string} end: the reservation's ending date
   * @param {string} name: the reservation's name
   * @param {string} [id]: the reservation's ID
   * @param {string} [notes]: any notes about the reservation
   */
  async update (start: string, end: string, name: string, id: string = uuid.v4(), notes?: string) {
    const params: DocumentClient.UpdateItemInput = {
      TableName: DynamoDBManager.TABLE_NAME,
      Key: { id: id },
      ExpressionAttributeNames: {
        '#S' : 'start',
        '#E' : 'end',
        '#NA': 'name',
        '#NO': 'notes'
      },
      ExpressionAttributeValues: {
        ':s' : start,
        ':e' : end,
        ':na': name,
        ':no': notes || ''
      },
      UpdateExpression: 'SET #S = :s, #E = :e, #NA = :na, #NO = :no'
    };

    try {
      const item: ReservationRecord = { end, id, name, notes, start };
      console.log('Adding a new item...');
      await this.client.update(params).promise();
      console.log('Added item:', JSON.stringify(item, null, 2));
      return { error: null, item };
    } catch (error) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(error, null, 2));
      return { error, item: null };
    }
  }
}
