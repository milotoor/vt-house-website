import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import some from 'lodash/some';
import './Reservations.less';


const { Paragraph, Text, Title } = Typography;

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

type DateSelection = Date[] | null;
interface DateSelectionProp {
  selectedDates: DateSelection
}

const enumerateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while(currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone().toDate());
  }

  return dates;
};

const formatDate = (date: Date) => moment(date).format('MMMM Do');
const DateConfirmation: React.SFC<DateSelectionProp> = ({ selectedDates }) => {
  if (selectedDates === null) return null;

  // Confirm that none of the given dates are already reserved
  const [start, end] = selectedDates;
  const dayIsReservedWrapped = dayIsReserved(reservations);
  const dateRange = enumerateDateRange(start, end);
  const reservationStatusByDay = dateRange.map(date => dayIsReservedWrapped({ date }));
  const alreadyReserved = some(reservationStatusByDay);

  // If any days have been reserved, print in red
  const rangeDiv = <div>{formatDate(selectedDates[0])} &mdash; {formatDate(selectedDates[1])}</div>;
  return alreadyReserved
    ? (
      <Text type="danger">
        {rangeDiv}
        <div>There is an existing reservation during the dates you have selected.</div>
      </Text>
    )
    : rangeDiv;
};

const RightColumn: React.SFC<DateSelectionProp> = ({ selectedDates }) =>
  <Typography>
    <Title level={3}>Thank you for your interest!</Title>
    <Paragraph>
      To make a reservation, please select the dates of interest and e-mail us at <a href="mailto:reservations@champlainhaven.com">reservations@champlainhaven.com</a>.
    </Paragraph>

    <Paragraph>
      <div><Text strong>Thank you,</Text></div>
      <div><Text strong>John & Margaret Toor</Text></div>
    </Paragraph>

    <Paragraph>
      <DateConfirmation selectedDates={selectedDates} />
    </Paragraph>
  </Typography>

const Availability = () => {
  const [reservedDays, setReservedDays] = useState(reservations);
  const [selectedDates, setSelectedDates] = useState(null as DateSelection);

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
            onChange={dates => setSelectedDates(dates as Date[])}
            selectRange
            showNeighboringMonth
            tileDisabled={dayIsReserved(reservedDays)}
          />
        </div>
      </Col>

      <Col span={12}>
        <RightColumn selectedDates={selectedDates} />
      </Col>
    </Row>
  );
};

export default Availability;
