import moment from 'moment';


export interface BasicReservation {
  start: moment.Moment;
  end: moment.Moment;
}

export interface Reservation extends BasicReservation {
  id: string;
  name: string;
  notes?: string;
}

export type DateRange = [Date, Date];
