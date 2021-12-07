import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenerateTimeSlot } from 'src/app/models/Globalfunctions';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-patient-bookappointment',
  templateUrl: './patient-bookappointment.component.html',
  styleUrls: ['./patient-bookappointment.component.css'],
})
export class PatientBookappointmentComponent implements OnInit {
  form!: FormGroup;
  selected: Date | undefined;
  firstslot!: Array<string>;
  secondslot!: Array<string>;
  constructor(private patientservice: PatientService) {}

  ngOnInit() {
    const start = new Date('2019-08-08 10:00');
    const end = new Date('2019-08-08 18:00');
    const timespan = 30 * 60; // 30 minutes
    const siestas = [
      {
        start: '2019-08-08 8:00',
        end: '2019-08-08  8:30',
      },
      {
        start: '2019-08-08 09:00:00.000',
        end: '2019-08-08 09:30:00.000',
      },

      {
        start: '2019-08-08 10:30:00.000',
        end: '2019-08-08 11:00:00.000',
      },
      {
        start: '2019-08-08 13:00:00.000',
        end: '2019-08-08 14:00:00.000',
      },
    ];

    let [firstslot, secondslot] = GenerateTimeSlot(
      start,
      end,
      timespan,
      siestas
    );
    this.firstslot = firstslot;
    this.secondslot = secondslot;
    //console.log(firstslot);
    //console.log(secondslot);
  }
}
