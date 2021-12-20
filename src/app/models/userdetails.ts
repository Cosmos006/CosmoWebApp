export class UserDetails{
    constructor(
    public UserDetailsId : string,
    public UserName :string,
    public Password : string,
    public Status : boolean,
    public IsFirstLogIn : boolean,
    public NoOfAttempts : number,
    public RoleId :number
    ){}
   
}