import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services';
import { Role } from 'src/app/models/Role';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import {Location} from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    error = '';
    currentUser!: User;

    private formSubmitAttempt!: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
       
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields

//     get form(): { [key: string]: AbstractControl; }
// {
//     return this.loginForm.controls;
// }
    // get f() { return this.loginForm.controls; }

    isFieldInvalid(field: string) {
        return (
          (!this.loginForm.value.valid && this.loginForm.value.touched) ||
          (this.loginForm.value.untouched && this.formSubmitAttempt)
        );
      }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
         
        this.loading = true;
        this.authenticationService.login(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value )
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                 
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
          this.formSubmitAttempt = true;

    }
}
