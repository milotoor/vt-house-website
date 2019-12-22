import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'antd';
import moment from 'moment';
import some from 'lodash/some';
import './Availability.less';

type Reservation = {
  start: moment.Moment
  end: moment.Moment
}

let reservations: Reservation[] = [];
const dayIsReserved = (reservations: Reservation[]) =>
  (args: { date: Date }) => {
    const momentDate = moment(args.date);
    return some(reservations.map(({ start, end }) =>
      start.isBefore(momentDate) && end.isAfter(momentDate)
    ));
  };

const Availability = () => {
  const [reservedDays, setReservedDays] = useState(reservations);
  useEffect(() => {
    // Query for dates that have been reserved
    const fetchReservations = async () => {
      // Make a request to AWS
      const reservationData = [{ start: moment('12/20/19'), end: moment('12/25/19') }];
      setReservedDays(reservationData);
      reservations = reservationData;
    };

    fetchReservations();
  }, []);

  return (
    <Row>
      <Col span={12}>
        <div className="calendar-container">
          <Calendar
            calendarType="US"
            selectRange
            showNeighboringMonth
            tileDisabled={dayIsReserved(reservedDays)}
          />
        </div>
      </Col>

      <Col span={12}>
        Select a date range.
      </Col>
    </Row>
  );
};

export default Availability;
