import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/Authservice/auth.service";
import { UserService } from "src/app/Services/Userservice/userservice/user.service";
import { ForgotpasswordComponent } from "../forgotpassword/forgotpassword.component";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userData: any;
  form: FormGroup = new FormGroup({});
  submitted = false;
  private formSubmitAttempt!: boolean;
  loading = false;
  public addCusForm!: FormGroup;
  wasFormChanged = false;
  constructor(private router:Router, private user: UserService, public dialog: MatDialog, private formBuilder: FormBuilder,private authservice:AuthService) { }


  dialogRef!: MatDialogRef <any> ;
  ngOnInit() {
    // this.user.currentUserData.subscribe(userData => (this.userData = userData));
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.value.valid && this.form.value.touched) ||
      (this.form.value.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authservice.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

   openDialog(): void {
    this.dialogRef = this.dialog.open(ForgotpasswordComponent, {
   
  });
   
  }

  onLogin() {
    let email:string = this.form.value.email;
    let password:string = this.form.value.password;

    

    // if (result === true) {
    //   // navigate to post-list
    //   this.router.navigate(["/post-list"])
    // } else {
    //   alert("Loged failed, try again!")
    // }
    

  }
   
}


  




