
import aws from 'aws-sdk';


aws.config.update({ region: "us-west-2" });

export function getDocumentClient () {
  return new aws.DynamoDB.DocumentClient();
}

export const TABLE_NAME = 'vt_reservations';

export enum LAMBDA_ACTIONS {
  addReservation,
  deleteReservation,
  getReservations
}

export type ReservationRecord = {
  end: string
  id: string
  name: string
  start: string
};
