import React, { useState } from 'react';
import moment from 'moment';
import { Button, Col, Form, Input, Row } from 'antd';

import {
  BasicReservation,
  Calendar,
  DateConfirmation,
  DateRange,
  fetchReservations,
  makeReservation,
  PagePadder,
  Reservation
} from '../shared';
import './Admin.less';


/** ======================== Types ========================================= */
type NewReservationFormProps = {
  reservations: BasicReservation[];
  secret: string;
  selectedDates: DateRange;
};

/** ======================== Components ==================================== */
const NewReservationForm: React.FC<NewReservationFormProps> = ({ reservations, selectedDates, secret }) => {
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        layout="horizontal"
        onFinish={onSubmit}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="Dates">
          <DateConfirmation reservations={reservations} selectedDates={selectedDates} />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'A name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );

  /** ======================== Callbacks ==================================== */
  async function onSubmit (values: { [name: string]: string }) {
    makeReservation(secret, {
      name: values.name,
      notes: values.notes,
      start: moment(selectedDates[0]),
      end: moment(selectedDates[1])
    });
  }
};

const Admin: React.FC = () => {
  const [loadState, setLoadState] = useState({ error: false, loaded: false, loading: false });
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateRange>();
  const [secret, setSecret] = useState('');

  return (
    <PagePadder id="admin-page">
      <div className="admin-secret">
        <Form layout="inline" onFinish={loadReservations}>
          <Form.Item label="Pass code">
            <Input.Password onChange={e => setSecret(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Load Reservations
            </Button>
          </Form.Item>
        </Form>
      </div>

      {loadState.loaded &&
        <Row>
          <Col span={12}>
            <Calendar onChange={setSelectedDates} reservations={reservations} />
          </Col>

          <Col span={12}>
            {selectedDates &&
              <NewReservationForm reservations={reservations} secret={secret} selectedDates={selectedDates} />
            }
          </Col>
        </Row>
      }
    </PagePadder>
  );

  /** ======================== Callbacks ==================================== */
  async function loadReservations () {
    setLoadState({ ...loadState, loading: true });

    try {
      // Query for dates that have been reserved
      const results = await fetchReservations(secret);

      // Update state with the results
      setLoadState({ error: false, loading: false, loaded: true });
      setReservations(results.map(
        ({ id, name, start, end }) => ({
          end: moment(end),
          id,
          name,
          start: moment(start)
        })
      ));
    } catch (e) {
      setLoadState({ error: true, loading: false, loaded: false });
    }
  }
};

export default Admin;
