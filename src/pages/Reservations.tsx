import React, { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';

import { ReservationRecord } from '../lambda/shared';
import {
  BasicReservation,
  Calendar,
  DateConfirmation,
  DateRange,
  fetchReservations,
  formatDateRange,
  makeQueryString,
  PagePadder
} from './shared';


const { Paragraph, Text, Title } = Typography;

/** ======================== Types ========================================= */
type RightColumnProps = {
  selectedDates?: DateRange;
  reservations: BasicReservation[];
};

/** ======================== Components ==================================== */
const RightColumn: React.FC<RightColumnProps> = (props) => {
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
  const [reservations, setReservations] = useState<BasicReservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateRange>();

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

  return (
    <PagePadder>
      <Row>
        <Col span={12}>
          <Calendar onChange={setSelectedDates} reservations={reservations} />
        </Col>

        <Col span={12}>
          <RightColumn reservations={reservations} selectedDates={selectedDates} />
        </Col>
      </Row>
    </PagePadder>
  );
};

/** ======================== Exports ======================================= */
export default Reservations;
