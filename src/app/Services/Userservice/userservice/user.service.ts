import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { environment } from '../../Url';
@Injectable({
  providedIn:'root'
})
export class UserService {
  // private userDataSource = new BehaviorSubject({email : '', password : ''});
  // currentUserData = this.userDataSource.asObservable();
  // constructor() { }
  // changeData(newUserData:any) {
  //   this.userDataSource.next(newUserData)
  // }
  readonly baseUrl = environment.BaseURI;

  constructor(private fb: FormBuilder, private http: HttpClient) { }


  formModel = this.fb.group({
    TitleFName: this.fb.group({
      Title:['',Validators.required],
      FirstName:['',Validators.required],
    }),
    LNameUserName:this.fb.group({
      LastName:['',Validators.required],
      UserName:['',Validators.required],
    }),
    Contacts:this.fb.group({
      PhoneNo:['',Validators.required],
      Email:['',Validators.required],
    }),
    Password:['',Validators.required,Validators.minLength(8)],
    ConfirmPassword:['',Validators.required,Validators.minLength(8)],
    // Passwords:this.fb.group({
    //   Password:['',Validators.required,Validators.minLength(8)],
    //   ConfirmPassword:['',Validators.required,Validators.minLength(8)]
    //   }),
      //}, {validator: this.comparePasswords }),
    DOB:this.fb.group({
      DateOfBirth:['',Validators.required],
    }),
  })

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl?.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password')?.value!= confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl?.setErrors(null);
    }
  }


  register(){
    var userDetails = {
      Title: this.formModel.value.TitleFName.Title,
      FirstName: this.formModel.value.TitleFName.FirstName,
      LastName: this.formModel.value.LNameUserName.LastName,
      UserName: this.formModel.value.LNameUserName.UserName.toLowerCase(),
      PhoneNo: this.formModel.value.Contacts.PhoneNo,
      Email: this.formModel.value.Contacts.Email,
      Password: this.formModel.value.Password,
      ConfirmPassword: this.formModel.value.ConfirmPassword,
      // Password: this.formModel.value.Passwords.Password,
      // ConfirmPassword: this.formModel.value.Passwords.ConfirmPassword,
      DateOfBirth: this.formModel.value.DOB.DateOfBirth,
      Role:"Patient"
    };
    //console.log(userDetails);
    return this.http.post(this.baseUrl+'ApplicationUser/Patient/Register', userDetails , {responseType: 'text'});
  }

  getUserProfile(){
    var tokenHeader = new HttpHeaders({'Authentication':'Bearer '+ localStorage.getItem('token')})
    return this.http.get(this.baseUrl + '/UserProfile',{headers:tokenHeader})
  }
}