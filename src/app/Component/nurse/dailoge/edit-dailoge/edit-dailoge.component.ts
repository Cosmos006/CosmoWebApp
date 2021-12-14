import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DailogeService } from 'src/app/Services/dailoge.service';

@Component({
  selector: 'app-edit-dailoge',
  templateUrl: './edit-dailoge.component.html',
  styleUrls: ['./edit-dailoge.component.css']
})
export class EditDailogeComponent implements OnInit {
  form !: FormGroup;
  constructor(public dialogRef: MatDialogRef<EditDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dailogueservice:DailogeService) { }

formControl = new FormControl('', [
Validators.required,
 Validators.minLength(4)

]);

  ngOnInit(): void {
    console.log(this.data.data.userID);
    console.log(this.data["userID"])
    


    
  }
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
