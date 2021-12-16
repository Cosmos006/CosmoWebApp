import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup ,FormControl, Validators} from '@angular/forms';
import { DailogeService } from 'src/app/Services/dailoge.service';

@Component({
  selector: 'app-edit-dailoge',
  templateUrl: './edit-dailoge.component.html',
  styleUrls: ['./edit-dailoge.component.css']
})
export class EditDailogeComponent implements OnInit {
  registerForm !: FormGroup;
  name !:string;
  gender !: string;
  address!: string;
  mobile!: number;
  age!:number;
  bloodGroup!:string;
  temparature!:string;
  bloodPresure!:string;
  sugarLevel!:string;

 
  constructor(public dialogRef: MatDialogRef<EditDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dailogueservice:DailogeService,private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    console.log(this.data.data.userID);
    console.log(this.data["userID"])

    this.name=this.data.data.name
    this.age=this.data.data.age
    this.gender=this.data.data.gender
    this.mobile=this.data.data.mobile
    this.bloodGroup=this.data.data.bloodGroup
    this.bloodPresure=this.data.data.bloodPresure
    this.sugarLevel=this.data.data.sugarLevel
    this.temparature=this.data.data.temparature
    this.address=this.data.data.address

    
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required,Validators.maxLength(10)],
            // validates date format yyyy-mm-dd
      // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
      });    
  }

  get f() { return this.registerForm.controls; }
  
  onNoClick(): void{
    this.dialogRef.close();

  }
  stopEdit(): void {
    this.dailogueservice.updateIssue(this.data);
    console.log("saveclicked");
  }
  submit() {
    
    this.dailogueservice.addAppoinmentData(this.data);
    console.log("postclicked");
  }
}
