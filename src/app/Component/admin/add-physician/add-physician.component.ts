import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-physician',
  templateUrl: './add-physician.component.html',
  styleUrls: ['./add-physician.component.css'],
})
export class AddPhysicianComponent implements OnInit {
  UserType: string = '';
  Type?: string;
  Physician!: FormGroup;
  loading = false;
  submitted = false;
  Gender: any;
  genderdata: any;
  designationdata: any;
  designation: any;
  educationdata: any;
  eduaction: any;
  department: any;
  departmentdata: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminservice: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.UserType += res.get('type');
    });

    this.adminservice.Gender().subscribe((res) => {
      this.genderdata = res.gender;
    });

    // this.genderdata = ['Male', 'Female', 'Other'];
    if (this.UserType === 'physician') {
      this.Type = 'Physician';

      if (this.UserType === 'physician') {
        this.adminservice.EduactionList(this.Type).subscribe((res) => {
          this.educationdata = res.physician;
        });

        this.adminservice.Designation(this.Type).subscribe((res) => {
          this.designationdata = res.physician;
        });

        this.adminservice.Department(this.Type).subscribe((res) => {
          this.departmentdata = res.physician;
        });
      }
    } else if (this.UserType === 'nurse') {
      this.Type = 'Nurse';

      if (this.UserType === 'nurse') {
        this.adminservice.EduactionList(this.Type).subscribe((res) => {
          this.educationdata = res.nurse;
        });
        this.adminservice.Designation(this.Type).subscribe((res) => {
          this.designationdata = res.nurse;
        });

        this.adminservice.Department(this.Type).subscribe((res) => {
          this.departmentdata = res.nurse;
        });
      }
    }

    this.FormData();
  }

  FormData() {
    this.Physician = this.formBuilder.group({
      firstName: [
        null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
      Gender: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      education: ['', Validators.required],
      // image: [''],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required, Validators.maxLength(10)],
      dob: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.Physician.controls;
  }
  get name() {
    this.submitted = false;
    return this.Physician.get('firstName');
  }

  //Gender
  genderChange(e: any) {
    this.Gender.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get gendererror() {
    return this.Physician.get('Gender');
  }

  //Email
  get emailerror() {
    return this.Physician.get('Email');
  }

  //Designation

  get designationerror() {
    return this.Physician.get('designation');
  }

  designationChange(e: any) {
    this.designation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //Eduaction
  get educationerror() {
    return this.Physician.get('education');
  }

  eduactionChange(e: any) {
    this.eduaction.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //image
  get imageerror() {
    return this.Physician.get('image');
  }

  //Last Name
  get lastnameerror() {
    return this.Physician.get('lastName');
  }

  //Mobilenumber
  get mobileerror() {
    return this.Physician.get('mobile');
  }

  //Dob
  get doberror() {
    return this.Physician.get('dob');
  }

  //department
  get departmenterror() {
    return this.Physician.get('department');
  }

  departmentChange(e: any) {
    this.department.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //Address
  get addresserror() {
    return this.Physician.get('address');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.Physician.invalid) {
      return;
    } else {
      if (this.UserType === 'physician') {
        this._snackBar.open('Phyician Registration Successful', 'Done', {
          panelClass: 'success',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
        });
      } else {
        this._snackBar.open('Nurse Registration Successful', 'Done', {
          panelClass: 'success',

          horizontalPosition: this.horizontalPosition,

          verticalPosition: this.verticalPosition,

          duration: 5000,
        });
      }
      console.log('success');
      console.log(this.Physician.value);
    }
  }
}
