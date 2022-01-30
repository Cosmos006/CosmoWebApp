import { Guid } from "guid-typescript";

export class UserDetails{
    constructor(
    public Id : Guid,
    public UserName :string,
    public Password : string,
    public Status : boolean,
    public IsFirstLogIn : boolean,
    public NoOfAttempts : number,
    public RoleId :number
    ){}
   
}