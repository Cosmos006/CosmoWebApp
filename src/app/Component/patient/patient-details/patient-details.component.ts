import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  form!:FormGroup;
  panelOpenState = false;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  constructor() { }
     
    
  ngOnInit(): void {
   this.form=new FormGroup({
    firstname:new FormControl(null,[Validators.required]),
    lastname:new FormControl(null,[Validators.required]),
    dateofbirth:new FormControl(null),
    Age:new FormControl(null),
    gender:new FormControl(null),
    race:new FormControl(null,[Validators.maxLength(50)]),
    ethnicity:new FormControl(null,[Validators.maxLength(50)]),
    languagesknown:new FormControl(null,[Validators.maxLength(50)]),
    email:new FormControl(null,[Validators.email]),
    homeaddress:new FormControl(null),
    pincode:new FormControl(null,[Validators.required,Validators.maxLength(6)]),
    country:new FormControl(null),
    contactnumber:new FormControl(null),
    emergancyfirstname:new FormControl(null,[Validators.required]),
    emergancylastname:new FormControl(null,[Validators.required]),
    emergancyrelationship:new FormControl(null,[Validators.required]),
    emergancyemail:new FormControl(null,[Validators.required,Validators.maxLength(6)]),
    emergancycontactnumber:new FormControl(null,[Validators.required]),
    emergancyaddress:new FormControl(null,[Validators.required]),
    emergancypincode:new FormControl(null,[Validators.required]),
    emergancycountry:new FormControl(null),

    accessforpatientportal:new FormControl(null,[Validators.required]),
   
   });
   
  }
 
  Allergy = new FormControl();

  AllergyIDList: number[] = [1,2,3,4,5,6,7,8,9];
  RelationshipList:string[]=['Father','Mother','Sibling','Spouse','Friend'];
  AllergytypeList:string[]=['Food','Drugs','Evironment'];
  AllergynameList:string[]=['Fish','Soy','Peanuts'];
  onSubmit()
  {
    console.log("hii");
  }

}
