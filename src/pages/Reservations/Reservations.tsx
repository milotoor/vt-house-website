import React, { useEffect, useState } from 'react';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import pickBy from 'lodash/pickBy';
import some from 'lodash/some';

import { LAMBDA_ACTIONS, ReservationRecord } from '../../lambda/shared';
import { PagePadder } from '../shared';
import './Reservations.less';


const { Paragraph, Text, Title } = Typography;

/** ======================== Types ========================================= */
type Reservation = {
  start: moment.Moment
  end: moment.Moment
}

type DateSelection = Date[] | null;
interface DateSelectionProp {
  selectedDates: DateSelection
  reservations: Reservation[]
}

type QueryStringPrimitive = string | number;
type QueryParamPair = [string, QueryStringPrimitive | QueryStringPrimitive[]];
type QueryParams = {
  [key: string]: unknown;
};

// This is meant to capture all values in JS that evaluate to `false` when passed through the
// Boolean constructor. This is incomplete, and perhaps impossible to do with TypeScript because
// there are some language values which types can't capture. For example, the type of `NaN` is
// `number`, yet `Boolean(NaN) === false`.
export type Falsey = false | 0 | '' | null | undefined;

/** ======================== Helpers ======================================= */
function dayIsReserved (reservations: Reservation[], date: Date) {
  const momentDate = moment(date);
  return some(reservations.map(({ start, end }) =>
    start.isSameOrBefore(momentDate) && end.isSameOrAfter(momentDate)
  ));
}

function enumerateDateRange (startDate: Date, endDate: Date): Date[] {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while(currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone().toDate());
  }

  return dates;
}

function formatDate (date: Date) {
  return moment(date).format('MMMM Do');
}

/**
 * Queries for dates that have been reserved
 */
function fetchReservations () : Promise<ReservationRecord[]> {
  const apiId = process.env.REACT_APP_API_ID;
  const apiRegion = process.env.REACT_APP_API_REGION;
  const apiStageName = process.env.REACT_APP_API_STAGE_NAME;
  const apiAgentName = 'vtDatabaseCRUDAgent';
  const uri = `https://${apiId}.execute-api.${apiRegion}.amazonaws.com/${apiStageName}/${apiAgentName}?type=${LAMBDA_ACTIONS.getReservations}`;

  // Make a request to AWS
  return fetch(uri).then(response => response.json());
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

function formatDateRange (selectedDates: Date[]) {
  return `${formatDate(selectedDates[0])} — ${formatDate(selectedDates[1])}`;
}


/** ======================== Components ==================================== */
const DateConfirmation: React.FC<DateSelectionProp> = ({ reservations, selectedDates }) => {
  if (selectedDates === null) return null;

  // Confirm that none of the given dates are already reserved
  const [start, end] = selectedDates;
  const dateRange = enumerateDateRange(start, end);
  const reservationStatusByDay = dateRange.map(date => dayIsReserved(reservations, date));
  const alreadyReserved = some(reservationStatusByDay);

  // If any days have been reserved, print in red
  const rangeDiv = <div>{formatDateRange(selectedDates)}</div>;
  return alreadyReserved
    ? (
      <Text type="danger">
        {rangeDiv}
        <div>There is an existing reservation during the dates you have selected.</div>
      </Text>
    )
    : rangeDiv;
};

const RightColumn: React.FC<DateSelectionProp> = (props) => {
  const subject = 'Renting Champlain Haven';
  const { selectedDates } = props;
  const dates = selectedDates
    ? ` (${formatDateRange(selectedDates)})`
    : '';

  const emailAddress = 'reservations@2or.net';
  const queryString = makeQueryString({ subject: subject + dates });

  return (
    <Typography>
      <Title level={3}>Thank you for your interest!</Title>
      <Paragraph>
        To make a reservation, please select the dates of interest and e-mail us
        at <a href={'mailto:' + emailAddress + queryString} rel="noreferrer noopener" target="_blank">{emailAddress}</a>.
      </Paragraph>

      <Paragraph>
        <div><Text strong>Thank you,</Text></div>
        <div><Text strong>John & Margaret Toor</Text></div>
      </Paragraph>

      <Paragraph>
        <DateConfirmation {...props} />
      </Paragraph>
    </Typography>
  );
};

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateSelection>(null);

  useEffect(() => {
    // Query for dates that have been reserved
    fetchReservations()
      .then((results: ReservationRecord[]) => {
        setReservations(results.map(({ start, end }) => {
          return {
            start: moment(start),
            end: moment(end)
          };
        }));
      });
  }, []);

  // Moment object representing today. Used in the `tileIsDisabled` function.
  // It's initialized here so we don't re-create it for every day of the month.
  const today = moment();

  return (
    <PagePadder>
      <Row>
        <Col span={12}>
          <div className="calendar-container">
            <Calendar
              calendarType="US"
              onChange={dates => setSelectedDates(dates as Date[])}
              selectRange
              showNeighboringMonth
              tileDisabled={tileIsDisabled}
            />
          </div>
        </Col>

        <Col span={12}>
          <RightColumn reservations={reservations} selectedDates={selectedDates} />
        </Col>
      </Row>
    </PagePadder>
  );

  function tileIsDisabled (props: CalendarTileProperties) {
    const isPast = moment(props.date).isBefore(today);
    return isPast || dayIsReserved(reservations, props.date);
  }
};

/** ======================== Exports ======================================= */
export default Reservations;
