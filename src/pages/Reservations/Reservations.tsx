import React, { useEffect, useState } from 'react';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
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

/** ======================== Components ==================================== */
const DateConfirmation: React.FC<DateSelectionProp> = ({ reservations, selectedDates }) => {
  if (selectedDates === null) return null;

  // Confirm that none of the given dates are already reserved
  const [start, end] = selectedDates;
  const dateRange = enumerateDateRange(start, end);
  const reservationStatusByDay = dateRange.map(date => dayIsReserved(reservations, date));
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

const RightColumn: React.FC<DateSelectionProp> = (props) =>
  <Typography>
    <Title level={3}>Thank you for your interest!</Title>
    <Paragraph>
      To make a reservation, please select the dates of interest and e-mail us at <a href="mailto:reservations@2or.net">reservations@2or.net</a>.
    </Paragraph>

    <Paragraph>
      <div><Text strong>Thank you,</Text></div>
      <div><Text strong>John & Margaret Toor</Text></div>
    </Paragraph>

    <Paragraph>
      <DateConfirmation {...props} />
    </Paragraph>
  </Typography>;

const Availability: React.FC = () => {
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
export default Availability;
