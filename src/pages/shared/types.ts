import moment from 'moment';


export type BasicReservation = {
  start: moment.Moment;
  end: moment.Moment;
};

export type Reservation = BasicReservation & {
  id: string;
  name: string;
  notes?: string;
};

export type DateRange = [Date, Date];
