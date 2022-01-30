import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services';
import { Role } from 'src/app/models/Role';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserDetails } from 'src/app/models/userdetails';
import { Guid } from 'guid-typescript';

@Component( {selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
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
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  // create a field to hold error messages so we can bind it to our        template
  resultMessage!: string;
  closeResult = '';
  private formSubmitAttempt!: boolean;
  displayStyle!: '';
  private loggedIn = new BehaviorSubject<boolean>(false);

  userList: User[] = [];
  user!: User | undefined;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  close() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    const reload = () => window.location.reload();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authenticationService.getUserData().subscribe((res: User[]) => {
      this.userList.push(...res);
      console.log(this.userList);
    });
  }

 
 
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;
    var data = this.loginForm.value;
    //let isValidCredentials = this.userList.find(
    this.user = this.userList.find(
      (x) => x.userName === data.username && x.password === data.password
    );

    if (this.user !== undefined && this.loginForm.valid) {
      //  this.errorstatus = false;
      this.authenticationService.login(this.loginForm, this.user);
      this.GetUser(this.user?.id);
    } else {
      // this.errorstatus = true;
    }
  }

  GenerateOtp() {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!(this.userEmail.length > 0)) {
      this.alertService.error('Please Enter an Email');
      return;
    }
    if (!regexp.test(this.userEmail)) {
      this.alertService.error('Please Enter a valid email');
      return;
    }
    this.OldpassWordGenerated = true;
  }

    isFieldInvalid(field: string) {
        return (
          (!this.loginForm.value.valid && this.loginForm.value.touched) ||
          (this.loginForm.value.untouched && this.formSubmitAttempt)
        );
      }
    

      GetUser(id : Guid | undefined){
       this.authenticationService.getUser(id)   
      }
}
