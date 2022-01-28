// export class AdminDashboard {
//   constructor(Appointments: number, LockedAccount: number) {}
// }

export interface AdminDashboard {
  Appointments: number;
  LockedAccount: number;
}

export interface PeriodicElement {
  imageUrl: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class EventMap {
  constructor(public id: number, public title: string, public start: string) {}
}

//Patient
export interface Deactivate {
  id: number;
  firstName: string;
  contact: number;
  email: string;
  isActive: boolean;
}

export interface SoftDelete {
  id: number;
  firstName: string;
  contact: number;
  email: string;
  isActive: boolean;
}

export interface AdminPatient {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  contact: number;
  specialization: string;
  email: string;
  createdOn: string;
  isActive: boolean;
}

//Hospital

// export interface HospitalUser {
//   id: number;
//   title: string;
//   firstName: string;
//   lastName: string;
//   contact: number;
//   specialization: string;
//   email: string;
//   createdOn: string;
//   isActive: boolean;

// }
