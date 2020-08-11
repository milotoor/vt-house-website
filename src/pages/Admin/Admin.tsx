import { Alert, Button, Card, Col, Form, Input, Modal, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';
import moment from 'moment';
import * as React from 'react';

import {
  Calendar,
  DateConfirmation,
  DateRange,
  formatDateRange,
  PagePadder,
  Reservation,
  ReservationManager,
  useReservationManager
} from '../shared';
import './Admin.less';


const { Title } = Typography;

/** ======================== Types ========================================= */
type EditReservationFormProps = {
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

type AdminContext = {
  reservations: ReservationManager;
};

/** ======================== Context ======================================= */
const AdminContext = React.createContext<AdminContext>({
  reservations: new ReservationManager()
});

/** ======================== Components ==================================== */
const EditReservationForm = React.forwardRef<FormInstance, EditReservationFormProps>(
  (props, ref) => {
    const { clearDates, reservation, selectedDates } = props;
    const { reservations } = React.useContext(AdminContext);

    // Create a form instance and expose it with `useImperativeHandle`. This
    // allows parent components to pass a ref to this component and then
    // imperatively submit the form. Imperative code is a bit of a React anti-
    // pattern, but it simplifies things in this case.
    //
    // See more here:
    //   https://reactjs.org/docs/hooks-reference.html#useimperativehandle
    const [form] = Form.useForm();
    React.useImperativeHandle(ref, () => form);

    return (
      <>
        <Form
          form={form}
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

      await reservations.update({ ...(reservation || {}), ...reservationProperties });
      clearDates && clearDates();
    }
  }
);

const DeleteReservationModal: React.FC<ModalProps> = ({ closeModal, open, reservation }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { reservations } = React.useContext(AdminContext);
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
      await reservations.delete(reservation);
      closeModal();
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }
};

const EditReservationModal: React.FC<ModalProps> = ({ closeModal, open, reservation }) => {
  const [selectedDates, setSelectedDates] = React.useState<DateRange>([reservation.start.toDate(), reservation.end.toDate()]);
  const formRef = React.useRef<FormInstance>(null);

  return (
    <Modal
      onCancel={closeModal}
      onOk={confirmEdit}
      title={`Edit ${reservation.name}`}
      visible={open}
    >
      <EditReservationForm ref={formRef} reservation={reservation} selectedDates={selectedDates} />
    </Modal>
  );

  async function confirmEdit () {
    formRef.current?.submit();
    closeModal();
  }
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
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
  const [loadState, setLoadState] = React.useState({ error: false, loaded: false, loading: false });
  const [selectedDates, setSelectedDates] = React.useState<DateRange>();
  const reservations = useReservationManager();
  const formRef = React.useRef<FormInstance>(null);

  const today = moment();
  const [futures, pasts] = partition(reservations, r => r.end.isSameOrAfter(today));

  return (
    <AdminContext.Provider value={{ reservations }}>
      <PagePadder id="admin-page">
        <div className="admin-secret">
          <Form layout="inline" onFinish={loadReservations}>
            <Form.Item label="Pass code">
              <Input.Password onChange={e => reservations.setSecret(e.target.value)} />
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
                  ? (
                    <>
                      <EditReservationForm
                        ref={formRef}
                        clearDates={() => setSelectedDates(undefined)}
                        selectedDates={selectedDates}
                      />
                      <Row>
                        <Col span={20} offset={4}>
                          <Button onClick={handleSubmit} type="primary">Save</Button>
                        </Col>
                      </Row>
                    </>
                  ) : 'Select a date range from the calendar to make a reservation'
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
      await reservations.fetch();
      setLoadState({ error: false, loading: false, loaded: true });
    } catch (e) {
      setLoadState({ error: true, loading: false, loaded: false });
    }
  }

  /**
   * Imperatively submits the "New Reservation" form
   */
  function handleSubmit () {
    formRef.current?.submit();
  }
};

export default Admin;
