import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services';
import { Role } from 'src/app/Modules/Role';
import { User } from 'src/app/Modules/User';
import { ModalDismissReasons, NgbModal,  } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import {Location} from '@angular/common';
import { BehaviorSubject } from 'rxjs';




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
    loading = false;
    submitted = false;
    returnUrl!: string;
    error = '';
    currentUser!: User;
    IsmodelShow!: boolean;
    userEmail!: string;
    mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
    // create a field to hold error messages so we can bind it to our        template
    resultMessage!: string;
    closeResult = '';
    private formSubmitAttempt!: boolean;
  displayStyle!: '';
  private loggedIn = new BehaviorSubject<boolean>(false); 
 

    constructor(private location:Location,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,private alertService:AlertService,
        private authenticationService: AuthenticationService, private modalService: NgbModal
    ) { 
       
    }

    open(content:any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
    
    // open(content:any) {
    //   this.modalService.open(content,
    //  {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     this.closeResult = 
    //        `Dismissed ${this.getDismissReason(reason)}`;
    //   });

    // }

    // private getDismissReason(reason: any): string {
    //   if (reason === ModalDismissReasons.ESC) {
    //     return 'by pressing ESC';
    //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //     return 'by clicking on a backdrop';
    //   } else {
    //     return `with: ${reason}`;
    //   }
    // }
    

      close() {
        this.modalService.dismissAll();
      }
    

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        const reload=()=>window.location.reload();
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
                if (this.currentUser.username !== '' && this.currentUser.password !== '' ) { // {3}
                  this.loggedIn.next(true);
                  this.router.navigate(['/']);
                  }

    }

    GenerateOtp() {
       
           let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!(this.userEmail.length > 0)) {
      this.alertService.error("Please Enter an Email");
      return;
    }
    if (!regexp.test(this.userEmail)) {
      this.alertService.error("Please Enter a valid email")
      return;
    } 
    this.OldpassWordGenerated = true; 
          
      
      }
    
    //   ResetPassword() {
       
    //     this.errorMessage = "";
    //     // if (this.oldpasswordInmailGenerated != this.oldpassword) {
    //     //   this.errorMessage += "Entered old Password is incorrect";
    //     //   return;
    //     // }
    //     // if (this.newpassword != this.confirmpassword) {
    //     //   this.errorMessage += "Passwords are not same";
    //     //   return;
    //     // }
    
    //     if (this.newpassword.length < 8) {
    //       this.errorMessage += "Password cannot be less than 8 characters";
    //       return;
    //     }

    //     this.modalService.dismissAll();
       
    //     close() ;
    //  //   this.location.back();
    //   }
}
