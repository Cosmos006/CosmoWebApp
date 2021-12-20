import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserDetails } from 'src/app/models/userdetails';
import { AuthService } from 'src/app/Services/Authservice/auth.service';
import { UserService } from 'src/app/Services/Userservice/userservice/user.service';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

enum Role {
  Admin = 1,
  Physician,
  Nurse,
  Patient,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData: any;
  submitted = false;
  private formSubmitAttempt!: boolean;
  loading = false;
  public addCusForm!: FormGroup;
  wasFormChanged = false;
  userList: any[] = [];
  user!: UserDetails | undefined;
  isValidCredentials!: boolean;
  errorstatus : boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    UserName: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', Validators.required],
    }),
  });

  dialogRef!: MatDialogRef<any>;
  ngOnInit() {
    this.userList = this.authService.getUserData();
    console.log(this.userList);
    if (localStorage.getItem('token') !== null)
    this.router.navigate(['/AdminDashBoard']);
    else 
      this.router.navigateByUrl('');
  }
  onSubmit() {
    var data = this.form.value;
    console.log(data)
    let isValidCredentials = this.userList.find(
      (x) =>
         x.userName===  data.UserName &&
        // this.form.value.UserName.toLowerCase() &&
        x.password === data.Passwords.Password
        //this.form.value.Password
    );
    console.log(isValidCredentials);
    if (isValidCredentials !== undefined) {
     console.log('Hii')
     this.errorstatus = false;
       this.authService.login(this.form).subscribe({
        next: (res: any) => {
          console.log(res)
          localStorage.setItem('token', res.token);
          console.log(localStorage.getItem('token'))
          //var username = this.form.value.UserName;
          // this.user = this.userList.find(
          //   (x) => x.UserName.toLowerCase() === username.toLowerCase()
          // );
          //if (this.user !== undefined) {
            this.router.navigate(['AdminDashBoard']);
            //this.router.navigateByUrl('AdminDashBoard');  
          //this.router.navigate(['/AdminDashBoard']);
            console.log('Hii');
          //}
        },
        error: (e) => console.error(e),
      });
    }
    else{
      this.errorstatus = true;
    }
  }

  isFieldInvalid(field: string) {
    // return (
    //   (!this.form.value.valid && this.form.value.touched) ||
    //   (this.form.value.untouched && this.formSubmitAttempt)
    // );
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ForgotpasswordComponent, {});
  }
}
