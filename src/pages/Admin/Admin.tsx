import React, { useState } from 'react';
import moment from 'moment';
import { Alert, Button, Card, Col, Form, Input, Modal, Row, Typography } from 'antd';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';
import without from 'lodash/without';

import {
  BasicReservation,
  Calendar,
  DateConfirmation,
  DateRange,
  deleteReservation,
  editReservation,
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
  clearDates?: () => void;
  reservation?: Reservation;
  selectedDates: DateRange;
};

type ReservationCardProps = {
  reservation: Reservation;
};

type ModalProps = {
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
  reservations: Reservation[];
  secret: string;
  updateReservation: ReservationCallback;
};

/** ======================== Context ======================================= */
const AdminContext = React.createContext<AdminContext>({
  addReservation: () => {},
  removeReservation: () => {},
  reservations: [],
  secret: '',
  updateReservation: () => {}
});

/** ======================== Components ==================================== */
const NewReservationForm: React.FC<NewReservationFormProps> = ({ clearDates, reservation, selectedDates }) => {
  const { addReservation, reservations, secret } = React.useContext(AdminContext);
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        layout="horizontal"
        onFinish={onSubmit}
        wrapperCol={{ span: 20 }}
        initialValues={
          reservation
            ? { name: reservation.name, notes: reservation.notes }
            : {}
        }
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
            Save
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
    clearDates && clearDates();
  }
};

const DeleteReservationModal: React.FC<ModalProps> = ({ closeModal, open, reservation }) => {
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

const EditReservationModal: React.FC<ModalProps> = ({ closeModal, open, reservation }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [selectedDates, setSelectedDates] = useState<DateRange>([reservation.start.toDate(), reservation.end.toDate()]);
  const { reservations, secret, updateReservation } = React.useContext(AdminContext);

  return (
    <Modal
      confirmLoading={loading}
      onCancel={closeModal}
      onOk={confirmEdit}
      title={`Edit ${reservation.name}`}
      visible={open}
    >
      <NewReservationForm reservation={reservation} selectedDates={selectedDates} />
      {error &&
        <Alert
          message="Edit failed"
          description="Check the browser console/AWS logs for details..."
          type="error"
        />
      }
    </Modal>
  );

  async function confirmEdit () {
    setLoading(true);

    try {
      await editReservation(secret, reservation);
      closeModal();
      updateReservation(reservation);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState();
  const [editModalOpen, setEditModalOpen] = React.useState();
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

      <EditReservationModal
        closeModal={() => setEditModalOpen(false)}
        open={editModalOpen}
        reservation={reservation}
      />
    </>
  );

  /** ======================== Callbacks ==================================== */
  function confirmDelete () {
    setDeleteModalOpen(true);
  }

  function editReservation () {
    setEditModalOpen(true);
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
    <AdminContext.Provider value={{ addReservation, removeReservation, reservations, secret, updateReservation }}>
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

              <Col className="new-reservation-form" span={12}>
                {selectedDates
                  ? <NewReservationForm clearDates={() => setSelectedDates(undefined)} selectedDates={selectedDates} />
                  : 'Select a date range from the calendar to make a reservation'
                }
              </Col>
            </Row>

            <ReservationSection reservations={orderReservations(futures, 'asc')} title="Upcoming Reservations" />

            {
              // Don't render the "past reservations" sections if there aren't any
              pasts.length > 0 &&
                <ReservationSection reservations={orderReservations(pasts, 'desc')} title="Past Reservations" />
            }
          </>
        }
      </PagePadder>
    </AdminContext.Provider>
  );

  /** ======================== Helpers ====================================== */
  function orderReservations (reservations: Reservation[], dir: 'asc' | 'desc') {
    return orderBy(reservations, 'start', dir);
  }

  /** ======================== Callbacks ==================================== */
  async function loadReservations () {
    setLoadState({ ...loadState, loading: true });

    try {
      // Query for dates that have been reserved
      const reservations = await fetchReservations(secret);

      // Update state with the results
      setLoadState({ error: false, loading: false, loaded: true });
      setReservations(reservations);
    } catch (e) {
      setLoadState({ error: true, loading: false, loaded: false });
    }
  }

  function addReservation (reservation: Reservation) {
    setReservations([...reservations, reservation]);
  }

  function removeReservation (reservation: Reservation) {
    setReservations(without(reservations, reservation));
  }

  function updateReservation (reservation: Reservation) {
    const index = findIndex(reservations, { id: reservation.id });
    const newReservations = [...reservations];
    newReservations.splice(index, 1, reservation);
    setReservations(newReservations);
  }
};

export default Admin;