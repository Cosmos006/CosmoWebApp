import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  RequiredValidator,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core/option';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatAccordion } from '@angular/material/expansion';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { Allergy } from '../../../models/allergy-model';
// import { logKeyValuePairs } from 'src/app/Models/Globalfunctions';
import { Patientdetails } from 'src/app/models/patientdetails-model';

import { Postal } from 'src/app/models/postal-model';
import { patientdetails } from 'src/app/Services/patientdetails.service';
import { environment } from 'src/app/Services/Url';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  //variable declaration
  value: any;
  Allergytype: string = '';
  AllergyId: string = '';
  role: string = 'admin';
  Countrycode: string = '';
  Pincode: Number = 0;
  step = 0;
 
  today = new Date();
  panelOpenState = false;
  selectedgender: string | undefined;
  selection: string | undefined;
  //list/object declaration
  listOfPosts: Allergy[] = [];
  listOfAllergytype: string[] = [];
  listOfAllergyName: Allergy[] = [];
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  form!: FormGroup;
  postobj!: Patientdetails;
  postal!: Postal;
 // postobj: Patientdetails = new Patientdetails();
  patientAddressdetailslist: Postal[] | undefined;
  RelationshipList: string[] = [
    'Father',
    'Mother',
    'Sibling',
    'Spouse',
    'Friend',
  ];
  genderlist: string[] = ['Male', 'Female'];
  selectionlist: string[] = ['Yes', 'No'];

  constructor(private patient: patientdetails) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      patientid: new FormControl(null),
      firstname: new FormControl(
        this.postobj?.firstname ? this.postobj.firstname : null,
        [titleValidator(), Validators.pattern('^[a-zA-Z]+$')]
      ),
      lastname: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      dateofbirth: new FormControl(null, [Validators.required]),
      age: new FormControl(null),
      gender: new FormControl(null, [Validators.required]),
      race: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      ethnicity: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      languagesknown: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      email: new FormControl(null, [
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      homeaddress: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      pincode: new FormControl(null, [
        Validators.maxLength(6),
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      country1: new FormControl(null),
      state: new FormControl(null),
      contactnumber: new FormControl(null, [
        Validators.maxLength(10),
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ]),
      emergancyfirstname: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      emergancylastname: new FormControl(null, [
        titleValidator(),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      emergancyrelationship: new FormControl(null, [Validators.required]),
      emergancyemail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      emergancycontactnumber: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$'),
      ]),
      emergancyaddress: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      emergancypincode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^[0-9]+$'),
      ]),
      emergancycountry: new FormControl(null),
      accessforpatientportal: new FormControl(null, [Validators.required]),
      allergyid: new FormControl(null),
      allergytype: new FormControl(null),
      allergyname: new FormControl(null),
      allergydetails: new FormControl(null),
      allergydescription: new FormControl(null),
      clinicalinformation: new FormControl(null),
    });
   this.fetchdata();
    this.getAllergyDetails();
   // logKeyValuePairs(this.form,0);
  }

  getAllergyDetails() {
    this.patient.getallergydata().subscribe((x) => {
      this.listOfPosts.push(...x);
      for (let i = 0; i < this.listOfPosts.length; i++) {
        this.listOfAllergytype.push(this.listOfPosts[i].AllergyType);
        var mySet = new Set(this.listOfAllergytype);
        this.listOfAllergytype = [...mySet];
        //console.log(myArr);
      }
    });
  }

  getAllergyNameDetails(Allergytype: string) {
    this.patient
      .getAllerynamefromallergytype(Allergytype)
      .subscribe((result) => {
        console.log(result);
        this.listOfAllergyName.splice(0, this.listOfAllergyName.length);
        this.listOfAllergyName.push(...result);
      });
  }

  Addupdatepatientdetails(index: number) {
    
    if (this.form.invalid && index == 0) {
      alert('check all fields are filled');
      console.log(this.form);
    } else {
      console.log(this.form);
      this.postobj.id = this.form.value.patientid;
      this.postobj.firstname = this.form.value.firstname;
      this.postobj.lastname = this.form.value.lastname;
      this.postobj.age = this.form.value.age;
      this.postobj.gender = this.form.value.gender;
      this.postobj.race = this.form.value.race;
      this.postobj.ethnicity = this.form.value.ethnicity;
      this.postobj.languagesknown = this.form.value.languagesknown;
      this.postobj.email = this.form.value.email;
      this.postobj.homeaddress = this.form.value.homeaddress;
      this.postobj.pincode = this.form.value.pincode;
      this.postobj.country = this.form.value.country;
      this.postobj.state = this.form.value.state;
      this.postobj.contactnumber = this.form.value.contactnumber;
      this.postobj.emergancyfirstname = this.form.value.emergancyfirstname;
      this.postobj.emergancylastname = this.form.value.emergancylastname;
      this.postobj.emergancyrelationship =
        this.form.value.emergancyrelationship;
      this.postobj.emergancyemail = this.form.value.emergancyemail;
      this.postobj.emergancycontactnumber =
        this.form.value.emergancycontactnumber;
      this.postobj.emergancyaddress = this.form.value.emergancyaddress;
      this.postobj.emergancypincode = this.form.value.emergancypincode;
      this.postobj.emergancycountry = this.form.value.emergancycountry;
      this.postobj.accessforpatientportal =
        this.form.value.ccessforpatientportal;
      this.postobj.allergyid = this.form.value.allergyid;
      this.postobj.allergyname = this.form.value.allergyname;
      this.postobj.allergytype = this.form.value.allergytype;
      this.postobj.allergydetails = this.form.value.allergydetails;
      this.postobj.allergydescription = this.form.value.allergydescription;
      this.postobj.clinicalinformation = this.form.value.clinicalinformation;

      if (index == 0) {
        this.patient.addPost(this.postobj);
        alert('successfully enter');
      } else {
        this.patient
          .UpdatePatientdetails(this.postobj, this.postobj.id)
          .subscribe((result) => {
            console.log(result);
          });

        alert('successfully update record');
      }
    }
  }

  fetchdata() {
    this.patient
      .fetchfrombackendfromid1(9)
      .subscribe((result) => (this.postobj = result));
      console.log(this.postobj);
      this.form.controls['patientid'].patchValue(this.postobj.id);
    this.form.controls['firstname'].patchValue(this.postobj.firstname);
    this.form.controls['lastname'].patchValue(this.postobj.lastname);
    this.form.controls['dateofbirth'].patchValue(this.postobj.dateofbirth);
    this.form.controls['age'].patchValue(this.postobj.age);
    this.form.controls['gender'].patchValue(this.postobj.gender);
    this.form.controls['race'].patchValue(this.postobj.race);
    this.form.controls['ethnicity'].patchValue(this.postobj.ethnicity);
    this.form.controls['languagesknown'].patchValue(this.postobj.languagesknown);
    this.form.controls['email'].patchValue(this.postobj.email);
    this.form.controls['homeaddress'].patchValue(this.postobj.homeaddress);
    this.form.controls['pincode'].patchValue(this.postobj.pincode);
    this.form.controls['country'].patchValue(this.postobj.country);
    this.form.controls['state'].patchValue(this.postobj.state);
    this.form.controls['contactnumber'].patchValue(this.postobj.contactnumber);
    this.form.controls['emergancyfirstname'].patchValue(this.postobj.emergancyfirstname);
    this.form.controls['emergancylastname'].patchValue(
      this.postobj.emergancylastname
    );
    this.form.controls['emergancyrelationship'].patchValue(
      this.postobj.emergancyrelationship
    );
    this.form.controls['emergancyemail'].patchValue(this.postobj.emergancyemail);
    this.form.controls['emergancycontactnumber'].patchValue(this.postobj.emergancycontactnumber);
    this.form.controls['emergancyaddressemergancyaddress'].patchValue(
      this.postobj.emergancyaddress
    );
    this.form.controls['emergancypincode'].patchValue(
      this.postobj.emergancypincode
    );
    this.form.controls['emergancycountry'].patchValue(
      this.postobj.emergancycountry
    );
    this.form.controls['accessforpatientportal'].patchValue(
      this.postobj.accessforpatientportal
    );
    this.form.controls['allergyid'].patchValue(this.postobj.allergyid);
    this.form.controls['allergytype'].patchValue(this.postobj.allergytype);
    this.form.controls['allergyname'].patchValue(this.postobj.allergyname);
    this.form.controls['allergydetails'].patchValue(this.postobj.allergydetails);
    this.form.controls['allergydescription'].patchValue(
      this.postobj.allergydescription
    );
    this.form.controls['clinicalinformation'].patchValue(
      this.postobj.clinicalinformation
    );

    //alert("hii");
  }

  Clearpatientdetails() {
    this.form.reset();
  }

 
  //events
  onCountryChange(event: any)
  {
    console.log(event);
    
    this.Countrycode=event.iso2;
    
    this.form.controls['country1'].setValue(event.name);
   
  }
  onCountryChange2(event: any)
  {
    console.log(event);
    
    this.Countrycode=event.iso2;
    
    this.form.controls['emergancycountry'].setValue(event.name);
    
  }
  isDisabled: boolean = false;

  onChange() {
    this.isDisabled = true;
  }
  

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    
    //var date = new Date(event.value)
    //var year = date.getFullYear();
    alert(event.value?.getFullYear);
  }
  
  onChangeEvent(event: any){

    this.Pincode = event.target.value;
    this.patient.getCountrynamefrompincodconsole(this.Countrycode,this.Pincode).subscribe(result=>
     {
      console.log(result.result[0].state);
      this.form.controls['state'].setValue(result.result[0].state);
     
     });
   }
   onAllergytypeselect(event:any)
  {
   
      this.Allergytype=event.value;
    
     this.getAllergyNameDetails(this.Allergytype);
  }
  
  
}

export function titleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const title: string = control.value;

    if (title == null || title == '') {
      return { errorMessage: 'This field cannot be empty' };
    } else if (title.length < 2) {
      return { errorMessage: 'Please dont use abbreviations' };
    } else {
      return null;
    }
  };
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
