import pickBy from 'lodash/pickBy';
import some from 'lodash/some';
import moment from 'moment';

import { LAMBDA_ACTIONS, ReservationRecord } from '../../lambda/shared';
import { BasicReservation, Reservation } from './types';


/** ======================== Types ========================================= */
type QueryStringPrimitive = string | number;
type QueryParamPair = [string, QueryStringPrimitive | QueryStringPrimitive[]];
type QueryParams = {
  [key: string]: unknown;
};

// This is meant to capture all values in JS that evaluate to `false` when passed through the
// Boolean constructor. This is incomplete, and perhaps impossible to do with TypeScript because
// there are some language values which types can't capture. For example, the type of `NaN` is
// `number`, yet `Boolean(NaN) === false`.
type Falsey = false | 0 | '' | null | undefined;

/** ======================== API Methods =================================== */
function getLambdaURI (queryParams?: QueryParams) {
  const apiId = process.env.REACT_APP_API_ID;
  const apiRegion = process.env.REACT_APP_API_REGION;
  const apiStageName = process.env.REACT_APP_API_STAGE_NAME;
  const apiAgentName = 'vtDatabaseCRUDAgent';
  const queryString = makeQueryString(queryParams);

  return `https://${apiId}.execute-api.${apiRegion}.amazonaws.com/${apiStageName}/${apiAgentName}${queryString}`;
}

/**
 * Queries for dates that have been reserved
 */
export async function fetchReservations (secret?: string) {
  const uri = getLambdaURI({
    secret,
    type: LAMBDA_ACTIONS.getReservations
  });

  // Make a request to AWS
  const rawReservations: ReservationRecord[] = await fetch(uri).then(response => response.json());
  return rawReservations.map(parseReservation);
}

export async function makeReservation (secret: string, reservation: Omit<Reservation, 'id'>) {
  const uri = getLambdaURI({
    end: reservation.end.toISOString(),
    name: reservation.name,
    notes: reservation.notes,
    secret,
    start: reservation.start.toISOString(),
    type: LAMBDA_ACTIONS.addReservation,
  });

  // Make a request to AWS
  const rawReservation = await fetch(uri).then(response => response.json());
  return parseReservation(rawReservation);
}

export function deleteReservation (secret: string, reservation: Reservation) {
  const uri = getLambdaURI({
    id: reservation.id,
    secret,
    type: LAMBDA_ACTIONS.deleteReservation,
  });

  // Make a request to AWS
  return fetch(uri).then(response => response.json());
}

export async function editReservation (secret: string, reservation: Reservation) {
  const uri = getLambdaURI({
    end: reservation.end.toISOString(),
    id: reservation.id,
    name: reservation.name,
    notes: reservation.notes,
    secret,
    start: reservation.start.toISOString(),
    type: LAMBDA_ACTIONS.editReservation,
  });

  // Make a request to AWS
  const rawReservation = await fetch(uri).then(response => response.json());
  return parseReservation(rawReservation);
}

/** ======================== Miscellaneous ================================= */
/**
 * Returns `true` if the given date occurs in any of the date-ranges specified
 * by the `reservations`
 */
export function dayIsReserved (reservations: BasicReservation[], date: Date) {
  const momentDate = moment(date);
  return some(reservations.map(({ start, end }) =>
    start.isSameOrBefore(momentDate) && end.isSameOrAfter(momentDate)
  ));
}

function parseReservation (rawReservation: ReservationRecord): Reservation {
  return {
    ...rawReservation,
    end: moment(rawReservation.end),
    start: moment(rawReservation.start)
  }
}

/**
 * Standard date formatting
 */
function formatDate (date: Date) {
  return moment(date).format('MMMM Do');
}

/**
 * Formats a rage of dates
 */
export function formatDateRange (selectedDates: Date[], showYear: boolean = false) {
  const [date1, date2] = selectedDates;
  const [formatted1, formatted2] = selectedDates.map(formatDate);

  if (!showYear) {
    return `${formatted1} — ${formatted2}`;
  }

  // If both dates are in the same year, just print the year after both dates
  if (date1.getFullYear() === date2.getFullYear()) {
    return `${formatted1} — ${formatted2}, ${date1.getFullYear()}`;
  } else {
    return `${formatted1}, ${date1.getFullYear()} — ${formatted2}, ${date2.getFullYear()}`;
  }
}

/**
 * Produces the querystring for a request, given an object representing the key-value pairs to
 * include in the querystring.
 *
 * @param {QueryParams} params: the object of key-value pairs that should be converted into a
 *   querystring
 */
export function makeQueryString (params?: QueryParams): string {
  if (!params) return '';

  const queryParamPairs: QueryParamPair[] = omitFalsey(Object.entries(params)
    .map(([key, value]) => {
      // Apply some basic validation on the `unknown` type
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        Array.isArray(value)
      ) {
        return [key, value];
      }

      // Print a warning and return `null`. The `null` value will be removed by `omitFalsey`
      console.warn(`Query parameter "${key}" received invalid value: ${value}`);
      return null;
    }));

  // Reduce the array of pairs
  const queryString = queryParamPairs
    .map(([param, value]) => [param, encodeURIComponent(value.toString())].join('='))
    .join('&');

  return queryString.length === 0
    ? ''
    : `?${queryString}`;
}

/**
 * Filters an array of values to non-falsey values
 *
 * @param {object} arr: the array to filter falsey values from
 */
function omitFalsey <T>(arr: Array<T | Falsey>): Array<T>;

/**
 * Takes an object of values and returns all of the key-value pairs in that object that aren't
 * falsey
 *
 * @param {object} obj: the object to filter falsey values from
 */
function omitFalsey <T>(obj: Record<string, T | Falsey>): Record<string, T>;

function omitFalsey (arrayOrObject: any) {
  return Array.isArray(arrayOrObject)
    ? arrayOrObject.filter(isTruthy)
    : pickBy(arrayOrObject, isTruthy);
}

/**
 * Type guard to check if an input is of type `T` or falsey
 * @param x
 */
function isTruthy <T>(x: T | Falsey): x is T {
  return Boolean(x);
}