import { Typography } from 'antd';
import classNames from 'classnames';
import some from 'lodash/some';
import moment from 'moment';
import * as React from 'react';
import ReactCalendar, { CalendarTileProperties } from 'react-calendar';
import ReactDatePicker from 'react-date-picker';

import { ReservationManager } from '../ReservationManager';
import { DateRange } from '../types';
import { formatDateRange} from '../util';
import './Calendar.less';


const { Text } = Typography;

/** ======================== Types ========================================== */
type CalendarProps = {
  onChange: (dates: [Date, Date]) => void;
  reservations: ReservationManager;
};

type DateConfirmationProps = {
  selectedDates?: DateRange;
  reservations: ReservationManager;
};

type DatePickerProps = {
  onChange: (d: Date) => void;
  reservations: ReservationManager;
  value: Date;
};

/** ======================== Components ===================================== */
export const Calendar: React.FC<CalendarProps> = ({ onChange, reservations }) => {
  const tomorrow = moment().add(1, 'day');

  return (
    <div className="calendar-container">
      <ReactCalendar
        calendarType="US"
        onChange={dates => onChange(dates as [Date, Date])}
        selectRange
        tileContent={
          // The triangles are used to render the first- and second-half of the
          // calendar days. They are used to indicate when a reservation begins
          // or ends
          <>
            <div className="triangle early" />
            <div className="triangle late" />
          </>
        }
        tileClassName={getTileClassname}
        tileDisabled={makeTileIsDisabledCallback(reservations)}
      />
    </div>
  );

  /** ====================== Callbacks ====================================== */
  function getTileClassname (props: CalendarTileProperties) {
    const date = moment(props.date);
    return classNames({
      end: reservations.ends(date),
      booked: reservations.isFullyBooked(props.date),
      start: reservations.starts(date),
      tomorrow: tomorrow.isSame(date, 'day')
    });
  }
};

export const DateConfirmation: React.FC<DateConfirmationProps> = ({ reservations, selectedDates }) => {
  if (!selectedDates) return null;

  // Confirm that none of the given dates are already reserved
  const [start, end] = selectedDates;
  const dateRange = enumerateDateRange(start, end);
  const reservationStatusByDay = dateRange.map(date => reservations.isFullyBooked(date));
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

  /** ====================== Callbacks ====================================== */
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

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, reservations, value }) =>
  <ReactDatePicker
    calendarIcon={null}
    calendarType="US"
    clearIcon={null}
    onChange={d => onChange(d as Date)}
    tileDisabled={makeTileIsDisabledCallback(reservations)}
    value={value}
  />;

/**
 * Returns a callback for the calendar's `tileDisabled` prop
 */
const makeTileIsDisabledCallback = (reservations: ReservationManager) => {
  const today = moment();
  const tomorrow = moment().add(1, 'day');

  return function tileIsDisabled ({ date }: CalendarTileProperties) {
    const isPast = today.isSameOrAfter(date, 'day');
    const isFullyBooked = reservations.isFullyBooked(date);
    const isTomorrow = tomorrow.isSame(date, 'day');
    return isPast || isFullyBooked || (isTomorrow && reservations.starts(tomorrow));
  };
};
