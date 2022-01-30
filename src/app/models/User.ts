import { Guid } from "guid-typescript";

export class User {
  id?: Guid;
  userName!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role: any;
  token?: string;
  loggedIn: any;
}
