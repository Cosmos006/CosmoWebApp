import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services';
import { UserDetails } from 'src/app/models/userdetails';
import { Guid } from 'guid-typescript';


@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {
    showModal!: boolean;
    forgotModal!: boolean;
    isForgotPassword!: boolean;
    OldpassWordGenerated!: boolean;
    oldpasswordInmailGenerated!: number;
    oldpassword!: number;
    newpassword!: string;
    confirmpassword!: string;
    errorMessage!: string;
    loginForm!: FormGroup;
    Userlocal : any
    userList: any[] = [];
    user!: UserDetails | undefined;
    isValidCredentials!: boolean;
    errorstatus : boolean = false;
    submitted:boolean = false;
    private formSubmitAttempt!: boolean;
    displayStyle!: '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

   

    ngOnInit() {
        this.userList = this.authenticationService.getUserData();
        //console.log(this.userList);
        // if (localStorage.getItem('token') !== null)
        //     this.router.navigate(['AdminDashBoard']);
        // else 
        //   this.router.navigateByUrl('/login');
       

          this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    isFieldInvalid(field: string) {
        return (
          (!this.loginForm.value.valid && this.loginForm.value.touched) ||
          (this.loginForm.value.untouched && this.formSubmitAttempt)
        );
      }

      onSubmit() {
        this.submitted = true;
        var data = this.loginForm.value;
        console.log(data)
        //let isValidCredentials = this.userList.find(
         this.user = this.userList.find(
          (x) =>
             x.userName ===  data.username &&
            x.password === data.password
        );
        console.log(this.user);
        console.log(this.loginForm)
        if (this.user !== undefined && this.loginForm.valid ) {
         this.errorstatus = false;
           this.authenticationService.login(this.loginForm).subscribe({
            next: (res: any) => {
              console.log(res)
              localStorage.setItem('token', res.token);
              localStorage.setItem('userDetails', JSON.stringify(this.user))
              this.GetUser(this.user?.Id);
                this.router.navigateByUrl('/Home');
            },
            error: (e) => console.error(e),
          });
        }
        else{
          this.errorstatus = true;
        }
      }
    

      GetUser(id : Guid | undefined){
       this.authenticationService.getUser(id)   
      }
}
