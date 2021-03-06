import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import some from 'lodash/some';
import moment from 'moment';
import onChange from 'on-change';
import * as React from 'react';

import { LAMBDA_ACTIONS, ReservationRecord } from '../../lambda/shared';
import { Reservation, QueryParams } from './types';
import { makeQueryString } from './util';


/**
 * Manages reservations, including handling API calls and providing utility
 * methods for querying about them. The class extends the global `Array` class,
 * so it can be used in all contexts where an array can be used. Instances of
 * the class are returned by the `useReservationManager` hook, which also
 * observes the instances using the `Proxy` API (see definition below).
 */
export class ReservationManager extends Array<Reservation> {
  private _fetched = false;
  private _secret?: string;

  constructor (secret?: string) {
    super();
    this._secret = secret;
  }

  setSecret (secret: string) {
    this._secret = secret;
  }

  /** ====================== API Methods =================================== */
  /**
   * Fetches existing reservations
   */
  async fetch () {
    // Don't query more than once
    if (this._fetched) return this;
    this._fetched = true;

    const uri = getLambdaURI({
      secret: this._secret,
      type: LAMBDA_ACTIONS.getReservations
    });

    try {
      // Make a request to AWS
      const rawReservations: ReservationRecord[] =
        await fetch(uri).then(response => response.json());

      // Delete any existing reservation entries and append the newly-fetched
      // parsed reservations
      this.splice(0, this.length, ...rawReservations.map(parseReservation));
    } catch (e) {
      this._fetched = false;
      throw e;
    }
  }

  /**
   * Deletes an existing reservation
   *
   * @param {Reservation} reservation: the reservation to delete
   */
  async delete (reservation: Reservation) {
    const uri = getLambdaURI({
      id: reservation.id,
      secret: this._secret,
      type: LAMBDA_ACTIONS.deleteReservation,
    });

    // Make a request to AWS
    await fetch(uri).then(response => response.json());
    this.splice(this.indexOf(reservation), 1);
  }

  /**
   * Updates an existing reservation, or creates a new one if no ID is provided
   *
   * @param {Reservation} reservation: the new parameters of the reservation
   */
  async update (reservation: Omit<Reservation, 'id'> & { id?: string }) {
    const uri = getLambdaURI({
      end: reservation.end.toISOString(),
      id: reservation.id,
      name: reservation.name,
      notes: reservation.notes,
      secret: this._secret,
      start: reservation.start.toISOString(),
      type: LAMBDA_ACTIONS.updateReservation,
    });

    // Make a request to AWS
    const rawReservation: ReservationRecord = await fetch(uri).then(response => response.json());
    const parsed = parseReservation(rawReservation);

    if (reservation.id) {
      // If an ID was provided, splice the record in for the old one with the
      // same ID
      this.splice(findIndex(this, { id: reservation.id }), 1, parsed);
    } else {
      // Otherwise, push the new reservation to the back of the list
      this.push(parsed);
    }
  }

  /** ====================== Date methods ================================== */
  /**
   * Returns `true` if the given date is fully booked, i.e. if the date is mid-
   * reservation or on a day where one reservation ends and another begins
   *
   * @param {Date} date: the date to check
   */
  isFullyBooked (date: Date) {
    return this.isMidReservation(date) || this.isTransitionDay(date);
  }

  /**
   * Returns `true` if the given date is in the middle of a reservation (but not
   * at the start or end date of one)
   *
   * @param {Date} date: the date to check
   */
  private isMidReservation (date: Date) {
    return some(this, (({ start, end }) =>
        start.isBefore(date, 'day') && end.isAfter(date, 'day')
    ));
  }

  /**
   * Returns `true` if the given date is on a day when one reservation ends and
   * another begins
   *
   * @param {Date} date: the date to check
   */
  private isTransitionDay (date: Date) {
    // Finds ending days that are also starting days
    const transitionDays = map(this, 'end').filter(
      end => some(this, ({ start }) =>
        start.isSame(end, 'day')
      )
    );

    return some(transitionDays, day => day.isSame(date, 'day'));
  }

  /**
   * Returns `true` if a reservation begins on the provided day
   *
   * @param {Date} date: the date to check
   */
  starts (date: Date | moment.Moment) {
    return some(this, r => r.start.isSame(date, 'day'));
  }

  /**
   * Returns `true` if a reservation ends on the provided day
   *
   * @param {Date} date: the date to check
   */
  ends (date: Date | moment.Moment) {
    return some(this, r => r.end.isSame(date, 'day'));
  }
}

/** ======================== Helpers ======================================= */
function parseReservation (rawReservation: ReservationRecord): Reservation {
  return {
    ...rawReservation,
    end: moment(rawReservation.end),
    start: moment(rawReservation.start)
  }
}

function getLambdaURI (queryParams?: QueryParams) {
  const apiId = process.env.REACT_APP_API_ID;
  const apiRegion = process.env.REACT_APP_API_REGION;
  const apiStageName = process.env.REACT_APP_API_STAGE_NAME;
  const apiAgentName = process.env.REACT_APP_API_AGENT_NAME;
  const queryString = makeQueryString(queryParams);

  return `https://${apiId}.execute-api.${apiRegion}.amazonaws.com/${apiStageName}/${apiAgentName}${queryString}`;
}

/** ======================== Hooks ========================================= */
/**
 * React hook for accessing the reservation manager. This technically does not
 * return the `ReservationManager` object itself, but a `Proxy` of it that will
 * be observed for changes. Whenever the proxy is modified, a re-render is
 * forced. This enables the rest of the application to do things like
 *
 *   ```reservations.push(newReservation)```
 *
 * without explicitly updating state.
 */
export function useReservationManager (useSecret: boolean) {
  const forceRerender = useForceRerender();
  const [reservations,] = React.useState(new ReservationManager(useSecret ? '' : undefined));

  // This leverages the Proxy API and monitors the reservation manager.
  // Whenever the reservations change (i.e. a reservation is added/removed
  // from the array, or a reservation property is changed), a re-render occurs
  return onChange(reservations, forceRerender, { ignoreUnderscores: true });
}

/**
 * React hook to force a re-rendering. This is achieved by modifying a state
 * value that has no purpose but to trigger re-renders
 */
function useForceRerender () {
  const [arbitraryState, setArbitraryState] = React.useState(0);
  return () => setArbitraryState(arbitraryState + 1);
}
