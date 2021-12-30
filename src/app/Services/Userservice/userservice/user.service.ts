import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Modules/User';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class UserService {
    readonly baseUrl = environment.apiUrl;
    constructor(private http: HttpClient,private fb: FormBuilder) { }

    
  // formModel = this.fb.group({
  //   TitleFName: this.fb.group({
  //     Title:['',Validators.required],
  //     FirstName:['',Validators.required],
  //   }),
  //   LNameUserName:this.fb.group({
  //     LastName:['',Validators.required],
  //     UserName:['',Validators.required],
  //   }),
  //   Contacts:this.fb.group({
  //     PhoneNo:['',Validators.required],
  //     Email:['',Validators.required],
  //   }),
  //   // Password:['',Validators.required,Validators.minLength(8)],
  //   // ConfirmPassword:['',Validators.required,Validators.minLength(8)],
  //   // Passwords:this.fb.group({
  //   //   Password:['',Validators.required,Validators.minLength(8)],
  //   //   ConfirmPassword:['',Validators.required,Validators.minLength(8)]
  //   //   }),
  //     //}, {validator: this.comparePasswords }),
  //   DOB:this.fb.group({
  //     DateOfBirth:['',Validators.required],
  //   }),
  // })

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id?: number) {
       
            return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    
  register(registrationform:FormGroup){
  
    var userDetails = {
      Title: registrationform.value.Title,
      FirstName:registrationform.value.FirstName,
      LastName: registrationform.value.LastName,
      UserName: registrationform.value.UserName.toLowerCase(),
      PhoneNo: registrationform.value.PhoneNo,
      Email: registrationform.value.Email,
      DateOfBirth: registrationform.value.DateOfBirth,
      Role:"Patient",
      // Title: this.formModel.value.TitleFName.Title,
      // FirstName: this.formModel.value.TitleFName.FirstName,
      // LastName: this.formModel.value.LNameUserName.LastName,
      // UserName: this.formModel.value.LNameUserName.UserName.toLowerCase(),
      // PhoneNo: this.formModel.value.Contacts.PhoneNo,
      // Email: this.formModel.value.Contacts.Email,
      // //Password: this.formModel.value.Password,
      // //ConfirmPassword: this.formModel.value.ConfirmPassword,
      // // Password: this.formModel.value.Passwords.Password,
      // // ConfirmPassword: this.formModel.value.Passwords.ConfirmPassword,
      // DateOfBirth: this.formModel.value.DOB.DateOfBirth,
      // Role:"Patient"
    };
    console.log(userDetails);
    registrationform.reset();
    return this.http.post(this.baseUrl+'ApplicationUser/Patient/Register', userDetails , {responseType: 'text'});
  }
}

