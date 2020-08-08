import moment from 'moment';

import { Falsey, QueryParams, QueryParamPair } from './types';


/** ======================== Miscellaneous ================================= */
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
function omitFalsey <T>(arr: Array<T | Falsey>): Array<T> {
  return arr.filter(isTruthy);
}

/**
 * Type guard to check if an input is of type `T` or falsey
 * @param x
 */
function isTruthy <T>(x: T | Falsey): x is T {
  return Boolean(x);
}
