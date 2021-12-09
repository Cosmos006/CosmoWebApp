export interface PeriodicElement {
  imageUrl: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class EventMap {
  // public id: string,
  constructor(public title: string, public date: string) {}
}
