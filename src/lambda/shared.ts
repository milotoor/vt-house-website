
import aws from 'aws-sdk';


aws.config.update({ region: "us-west-2" });

export function getDocumentClient () {
  return new aws.DynamoDB.DocumentClient();
}

export const TABLE_NAME = 'vt_reservations';

export enum LAMBDA_ACTIONS {
  addReservation = 'add',
  deleteReservation = 'delete',
  getReservations = 'get'
}

export type ReservationRecord = {
  end: string;
  id: string;
  name: string;
  notes?: string;
  start: string;
};

/** ======================== Response utils ================================= */
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

/**
 * Creates the JSON-response object returned from the Lambda function
 *
 * @param {object} body: the body of the response
 */
export function respond (body: any) {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: headers
  };
}

/**
 * Creates the JSON-response object for an error response
 *
 * @param {number} code: the error-code of the response
 */
export function error (code: number) {
  return {
    statusCode: code,
    body: '',
    headers: headers
  };
}
