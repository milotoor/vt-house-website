/**
 * Contains items used by both the web application and the Lambda backend
 */
export enum LAMBDA_ACTIONS {
  addReservation = 'add',
  deleteReservation = 'delete',
  editReservation = 'edit',
  getReservations = 'get'
}

export type ReservationRecord = {
  end: string;
  id: string;
  name: string;
  notes?: string;
  start: string;
};
