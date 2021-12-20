import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { UserDetails } from 'src/app/models/userdetails';
import { User } from 'src/app/Modules/User';
import { environment } from '../Url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  readonly baseUrl = environment.BaseURI
  userList:UserDetails[] =[];

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private router: Router,private httpClient: HttpClient,private fb: FormBuilder) {}
  formModel = this.fb.group({
    UserName:['',Validators.required],
    Passwords:this.fb.group({
      Password:['',Validators.required],
    }),
    
  })

login(formModel : FormGroup) {
  var loginModel={
    //UserName:this.formModel.value.UserName,
    //Password:this.formModel.value.Passwords.Password
    UserName:formModel.value.UserName,
    Password:formModel.value.Passwords.Password
  }
  console.log(loginModel);
  return this.httpClient.post(this.baseUrl + 'ApplicationUser/Login', loginModel);
}

logout() {
  this.loggedIn.next(false);
  this.router.navigate(['/login']);
}

getUserData(){
  this.httpClient
  .get<UserDetails[]>(this.baseUrl + 'ApplicationUser/GetUser')
  .subscribe((res: UserDetails[]) => {
    //this.splice(0, this.userList.length);
    this.userList.push(...res);
  });
  return this.userList;
  }
  
}


