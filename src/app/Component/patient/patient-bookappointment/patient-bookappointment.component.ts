import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-bookappointment',
  templateUrl: './patient-bookappointment.component.html',
  styleUrls: ['./patient-bookappointment.component.css']
})
export class PatientBookappointmentComponent {
form !:FormGroup
  selected: Date | undefined;
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
