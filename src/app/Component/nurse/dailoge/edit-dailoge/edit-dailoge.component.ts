import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup ,FormControl, Validators} from '@angular/forms';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { Appointment } from 'src/app/models/patientDashboard';
import { Product } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctordata';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-edit-dailoge',
  templateUrl: './edit-dailoge.component.html',
  styleUrls: ['./edit-dailoge.component.css']
})
export class EditDailogeComponent implements OnInit {
  registerForm !: FormGroup;
  name !:string;
  id !:string;
  gender !: string;
  address!: string;
  mobile!: number;
  age!:number;
  physician!:string;
  date!:string;
  diagnosis!:string;
  sugarLevel!:string;
  docters!:Doctor[];
  selectedFoods = 1;
  constructor(public dialogRef: MatDialogRef<EditDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dailogueservice:DailogeService,private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    console.log(this.data.data);
   // this.selectedFoods=this.data.data.id
    console.log(this.id)
    this.name=this.data.data.name
    this.age=this.data.data.age
    this.gender=this.data.data.gender
    this.mobile=this.data.data.mobile
    this.physician=this.data.data.physician
    this.diagnosis=this.data.data.diagnosis
    this.sugarLevel=this.data.data.sugarLevel
    this.date=this.data.data.date
  
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required,Validators.maxLength(10)],
            // validates date format yyyy-mm-dd
      // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
      });   
        this.getdoctordata() 
  }

  get f() { return this.registerForm.controls; }
  
  onNoClick(): void{
    this.dialogRef.close();

  }
  stopEdit(): void {
    this.dailogueservice.updateIssue(this.data);
    console.log("saveclicked");
  }
  getdoctordata() {
    this.dailogueservice.getDoctorListData().subscribe(data => {
      this.docters=data;  
      console.log(this.docters)   
      
    });
  }
  select(docid: any) {
    console.log(docid.value);
    // let itemvalue = docid.target.value;   
    // console.log(docid.target.value);
   

    }
  submit() {
    
    this.dailogueservice.addAppoinmentData(this.data);
    console.log("postclicked");
  }
}
