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
