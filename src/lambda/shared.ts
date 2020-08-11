/**
 * Contains items used by both the web application and the Lambda backend.
 *
 * Note that this file MUST be located in the `lambda` directory and not in the
 * parent directory where it might make more sense to put it; if put in the
 * parent directory, the lambda build will not have the `index.js` file in the
 * top level of the build directory, which messes up the Lambda environment.
 * There are almost certainly ways around this, but I don't care enough to look
 * for them.
 */

export enum LAMBDA_ACTIONS {
  deleteReservation = 'delete',
  updateReservation = 'update',
  getReservations = 'get'
}

export type ReservationRecord = {
  end: string;
  id: string;
  name: string;
  notes?: string;
  start: string;
};
