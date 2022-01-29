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
  contact!: number;
  bookedslot:string="1";
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
    
    
  
    this.registerForm = this.formBuilder.group({
      id:[''],
      name: [''],
            // validates date format yyyy-mm-dd
      // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      diagnosis: [''],
      // acceptTerms: [false, Validators.requiredTrue]
      gender: [''],
      contact: [''],
      bookslot: ['',Validators.required],
      physician: [''],
      appointmentDateTime: ['',Validators.required],


      });   
      this.registerForm.controls['name'].setValue(this.data.data.name)
      this.registerForm.controls['name'].disable()
      this.registerForm.controls['bookslot'].setValue(this.data.data.bookSlot)
      this.registerForm.controls['gender'].setValue(this.data.data.gender)
      this.registerForm.controls['gender'].disable()
      this.registerForm.controls['contact'].setValue(this.data.data.contact)
      this.registerForm.controls['contact'].disable()
      this.registerForm.controls['physician'].setValue(this.data.data.physicanName)
      this.registerForm.controls['physician'].disable()
      this.registerForm.controls['diagnosis'].setValue(this.data.data.diagnosis)
      this.registerForm.controls['diagnosis'].disable()
      this.registerForm.controls['appointmentDateTime'].setValue(this.data.data.appointmentDateTime)
      this.registerForm.controls['id'].setValue(this.data.data.id)
        this.getdoctordata() 
  }

  get f() { return this.registerForm.controls; }
  
  onNoClick(): void{
    this.dialogRef.close();

  }
  // stopEdit(): void {
  //   this.dailogueservice.updateIssue(this.data);
  //   console.log("saveclicked");
  // }
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
    
    // this.dailogueservice.addAppoinmentData(this.data);
    // console.log("postclicked");

    let data=this.registerForm.value;
    let id=data['id']
    console.log(data['id']);
    this.dailogueservice.updateIssue(id,data)
  }
}
