import moment from 'moment';


/** ======================== Reservations ================================== */
export interface BasicReservation {
  start: moment.Moment;
  end: moment.Moment;
}

export interface Reservation extends BasicReservation {
  id: string;
  name: string;
  notes?: string;
}

export type DateRange = [Date, Date];

/** ======================== Querying ====================================== */
type QueryStringPrimitive = string | number;
export type QueryParamPair = [string, QueryStringPrimitive | QueryStringPrimitive[]];
export type QueryParams = {
  [key: string]: unknown;
};

/** ======================== Utilities ===================================== */
// This is meant to capture all values in JS that evaluate to `false` when passed through the
// Boolean constructor. This is incomplete, and perhaps impossible to do with TypeScript because
// there are some language values which types can't capture. For example, the type of `NaN` is
// `number`, yet `Boolean(NaN) === false`.
export type Falsey = false | 0 | '' | null | undefined;
