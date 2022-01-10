import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services';
import { Role } from 'src/app/Modules/Role';
import { User } from 'src/app/Modules/User';
import { UserDetails } from 'src/app/models/userdetails';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
     Userlocal : any
    // loading = false;
    // submitted = false;
    returnUrl!: string;
    // error = '';
    // currentUser!: User;
    userList: any[] = [];
    user!: UserDetails | undefined;
    isValidCredentials!: boolean;
    errorstatus : boolean = false;
    submitted:boolean = false;
    private formSubmitAttempt!: boolean;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

   

    ngOnInit() {
        this.userList = this.authenticationService.getUserData();
        console.log(this.userList);
        if (localStorage.getItem('token') !== null)
            this.router.navigate(['AdminDashBoard']);
        else 
          this.router.navigateByUrl('/login');
       

          this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
         console.log('Hii')
         this.errorstatus = false;
           this.authenticationService.login(this.loginForm).subscribe({
            next: (res: any) => {
              console.log(res)
              localStorage.setItem('token', res.token);
              localStorage.setItem('user', JSON.stringify(this.user))
              //this.Userlocal =   { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin }
              //localStorage.setItem('currentUser', this.Userlocal);
              console.log(localStorage.getItem('token'))
              //var username = this.form.value.UserName;
              // this.user = this.userList.find(
              //   (x) => x.UserName.toLowerCase() === username.toLowerCase()
              // );
              //if (this.user !== undefined) {
                this.router.navigateByUrl('/Home');
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
    

    // onSubmit() {
    //     this.submitted = true;
    //     if (this.loginForm.invalid) {
    //         return;
    //     }
         
    //     this.loading = true;
    //     this.authenticationService.login(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value )
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
                 
    //             },
    //             error => {
    //                 this.error = error;
    //                 this.loading = false;
    //             });
    //       this.formSubmitAttempt = true;

    // }
}
