import React, { useState } from 'react';
import moment from 'moment';
import { Alert, Button, Card, Col, Form, Input, Modal, Row, Typography } from 'antd';
import without from 'lodash/without';

import {
  BasicReservation,
  Calendar,
  DateConfirmation,
  DateRange,
  deleteReservation,
  fetchReservations,
  formatDateRange,
  makeReservation,
  PagePadder,
  Reservation
} from '../shared';
import './Admin.less';


const { Title } = Typography;

/** ======================== Types ========================================= */
type NewReservationFormProps = {
  reservations: BasicReservation[];
  selectedDates: DateRange;
};

type ReservationCardProps = {
  reservation: Reservation;
};

type DeleteReservationModalProps = {
  closeModal: () => void;
  open: boolean;
  reservation: Reservation;
};

type AdminContext = {
  removeReservation: (r: Reservation) => void;
  secret: string;
};

/** ======================== Context ======================================= */
const AdminContext = React.createContext<AdminContext>({
  removeReservation: () => {},
  secret: ''
});

/** ======================== Components ==================================== */
const NewReservationForm: React.FC<NewReservationFormProps> = ({ reservations, selectedDates }) => {
  const { secret } = React.useContext(AdminContext);
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

const DeleteReservationModal: React.FC<DeleteReservationModalProps> = ({ closeModal, open, reservation }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { removeReservation, secret } = React.useContext(AdminContext);
  return (
    <Modal
      title={`Delete ${reservation.name}`}
      visible={open}
      onOk={confirmDelete}
      confirmLoading={loading}
      onCancel={closeModal}
    >
      This will remove the reservation from the database and show the reservation's dates as available again.

      {error &&
        <Alert
          message="Delete failed"
          description="Check the browser console/AWS logs for details..."
          type="error"
        />
      }
    </Modal>
  );

  async function confirmDelete () {
    setLoading(true);

    try {
      await deleteReservation(secret, reservation);
      closeModal();
      removeReservation(reservation);
    } catch (e) {
      setLoading(false);
    }
  }
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState();
  const dateRange = formatDateRange([reservation.start.toDate(), reservation.end.toDate()]);
  return (
    <>
      <Card
        extra={
          <>
            <Button onClick={editReservation}>Edit</Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </>
        }
        size="small"
        title={`${reservation.name} (${dateRange})`}
      >
        {reservation.notes || 'No notes'}
      </Card>

      <DeleteReservationModal
        closeModal={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
        reservation={reservation}
      />
    </>
  );

  /** ======================== Callbacks ==================================== */
  function confirmDelete () {
    setDeleteModalOpen(true);
  }

  function editReservation () {

  }
};

const Admin: React.FC = () => {
  const [loadState, setLoadState] = useState({ error: false, loaded: false, loading: false });
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateRange>();
  const [secret, setSecret] = useState('');

  return (
    <AdminContext.Provider value={{ removeReservation, secret }}>
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
          <>
            <Row>
              <Col span={12}>
                <Calendar onChange={setSelectedDates} reservations={reservations} />
              </Col>

              <Col span={12}>
                {selectedDates &&
                  <NewReservationForm reservations={reservations} selectedDates={selectedDates} />
                }
              </Col>
            </Row>

            <div className="existing-reservations">
              <Title level={4}>Reservations</Title>
              {reservations.map(r => <ReservationCard key={r.id} reservation={r} />)}
            </div>
          </>
        }
      </PagePadder>
    </AdminContext.Provider>
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

  function removeReservation (reservation: Reservation) {
    setReservations(without(reservations, reservation));
  }
};

export default Admin;
