import React, { useState } from 'react';
import moment from 'moment';
import { Alert, Button, Card, Col, Form, Input, Modal, Row, Typography } from 'antd';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';
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
  clearDates: () => void;
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

type ReservationSectionProps = {
  reservations: Reservation[];
  title: string;
};

type ReservationCallback = (r: Reservation) => void;
type AdminContext = {
  addReservation: ReservationCallback;
  removeReservation: ReservationCallback;
  secret: string;
};

/** ======================== Context ======================================= */
const AdminContext = React.createContext<AdminContext>({
  addReservation: () => {},
  removeReservation: () => {},
  secret: ''
});

/** ======================== Components ==================================== */
const NewReservationForm: React.FC<NewReservationFormProps> = ({ clearDates, reservations, selectedDates }) => {
  const { addReservation, secret } = React.useContext(AdminContext);
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
    const reservationProperties = {
      name: values.name,
      notes: values.notes,
      start: moment(selectedDates[0]),
      end: moment(selectedDates[1])
    };

    const reservation = await makeReservation(secret, reservationProperties);
    addReservation(reservation);
    clearDates();
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
      setError(true);
    }
  }
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState();
  const dateRange = formatDateRange([reservation.start.toDate(), reservation.end.toDate()], true);
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

const ReservationSection: React.FC<ReservationSectionProps> = ({ reservations, title }) => {
  return (
    <div className="existing-reservations">
      <Title level={4}>{title}</Title>
      {reservations.map(r => <ReservationCard key={r.id} reservation={r} />)}
      {reservations.length === 0 && 'None.'}
    </div>
  );
};

const Admin: React.FC = () => {
  const [loadState, setLoadState] = useState({ error: false, loaded: false, loading: false });
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateRange>();
  const [secret, setSecret] = useState('');

  const today = moment();
  const [futures, pasts] = partition(reservations, r => r.end.isSameOrAfter(today));

  return (
    <AdminContext.Provider value={{ addReservation, removeReservation, secret }}>
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
                  <NewReservationForm
                    clearDates={() => setSelectedDates(undefined)}
                    reservations={reservations}
                    selectedDates={selectedDates}
                  />
                }
              </Col>
            </Row>

            <ReservationSection reservations={futures} title="Upcoming Reservations" />
            <ReservationSection reservations={pasts} title="Past Reservations" />
          </>
        }
      </PagePadder>
    </AdminContext.Provider>
  );

  /** ======================== Helpers ====================================== */
  function orderReservations (reservations: Reservation[]) {
    setReservations(orderBy(reservations, 'start', 'desc'));
  }

  /** ======================== Callbacks ==================================== */
  async function loadReservations () {
    setLoadState({ ...loadState, loading: true });

    try {
      // Query for dates that have been reserved
      const reservations = await fetchReservations(secret);

      // Update state with the results
      setLoadState({ error: false, loading: false, loaded: true });
      orderReservations(reservations);
    } catch (e) {
      setLoadState({ error: true, loading: false, loaded: false });
    }
  }

  function addReservation (reservation: Reservation) {
    orderReservations([...reservations, reservation]);
  }

  function removeReservation (reservation: Reservation) {
    setReservations(without(reservations, reservation));
  }
};

export default Admin;
