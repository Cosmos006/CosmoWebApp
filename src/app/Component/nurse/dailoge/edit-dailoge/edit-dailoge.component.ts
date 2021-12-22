import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-dailoge',
  templateUrl: './edit-dailoge.component.html',
  styleUrls: ['./edit-dailoge.component.css']
})
export class EditDailogeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);








  ngOnInit(): void {
    console.log(this.data.data.userID);
    console.log(this.data["userID"])
  }
  onNoClick(): void{
this.dialogRef.close();
  }
 

}
