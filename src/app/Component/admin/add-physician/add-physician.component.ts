import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-physician',
  templateUrl: './add-physician.component.html',
  styleUrls: ['./add-physician.component.css'],
})
export class AddPhysicianComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.genderdata = ['Male', 'Female', 'Other'];
    this.designationdata = [
      'Cardiologist',
      'Audiologist',
      'Dentist',
      'Gynaecologist',
    ];

    this.educationdata = [
      { ID: 1, Value: 'MBBS' },
      { ID: 2, Value: 'BDS' },
      { ID: 3, Value: 'BAMS' },
      { ID: 3, Value: 'BUMS' },
    ];

    this.departmentdata = [
      { ID: 1, Value: 'Operating theatre (OT)' },
      { ID: 2, Value: 'Intensive care unit (ICU)' },
      // { ID: 3, Value: 'Casualty department' },
      // { ID: 3, Value: 'Anesthesiology department' },
    ];

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
      console.log('success');
      console.log(this.Physician.value);
    }
  }
}
