export class PatientBookAppointmentDetails {
  constructor(public start: string, public end: string) {}
}

export interface Diagnosics {
  ID: number;
  Value: string;
}

export interface Physician {
  Id: number;
  PhysicianName: string;
}

// export interface Booking {
//   id: number;
//   title: string;
//   date: string;
//   description: string;
//   color: string;
// }

export class Booking {
  // public id: string,
  constructor(
    id: string,
    title: string,
    date: string,
    description: string,
    color: string
  ) {}
}
