import React from 'react';
import ReactCalendar, { CalendarTileProperties } from 'react-calendar';
import moment from 'moment';
import some from 'lodash/some';
import { Typography } from 'antd';

import { BasicReservation, DateRange } from './types';
import { dayIsReserved, formatDateRange } from './util';


const { Text } = Typography;

/** ======================== Types ========================================== */
type CalendarProps = {
  onChange: (dates: [Date, Date]) => void;
  reservations: BasicReservation[];
};

type DateConfirmationProps = {
  selectedDates?: DateRange;
  reservations: BasicReservation[];
};

/** ======================== Components ===================================== */
export const Calendar: React.FC<CalendarProps> = ({ onChange, reservations }) => {
  // Moment object representing today. Used in the `tileIsDisabled` function.
  // It's initialized here so we don't re-create it for every day of the month.
  const today = moment();

  return (
    <div className="calendar-container">
      <ReactCalendar
        calendarType="US"
        onChange={dates => onChange(dates as [Date, Date])}
        selectRange
        showNeighboringMonth
        tileDisabled={tileIsDisabled}
      />
    </div>
  );

  /** ====================== Helpers ======================================== */
  function dayIsReserved (reservations: BasicReservation[], date: Date) {
    const momentDate = moment(date);
    return some(reservations.map(({ start, end }) =>
      start.isSameOrBefore(momentDate) && end.isSameOrAfter(momentDate)
    ));
  }

  /** ======================== Callbacks ==================================== */
  function tileIsDisabled (props: CalendarTileProperties) {
    const isPast = moment(props.date).isBefore(today);
    return isPast || dayIsReserved(reservations, props.date);
  }
};

export const DateConfirmation: React.FC<DateConfirmationProps> = ({ reservations, selectedDates }) => {
  if (!selectedDates) return null;

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

  /** ======================== Callbacks ==================================== */
  function enumerateDateRange (startDate: Date, endDate: Date): Date[] {
    const dates = [];

    const currDate = moment(startDate).startOf('day');
    const lastDate = moment(endDate).startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }

    return dates;
  }
};