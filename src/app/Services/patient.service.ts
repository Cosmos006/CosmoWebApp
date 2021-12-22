import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient, environment } from '../Services/Url';
import {
  Booking,
  PatientBookAppointmentDetails,
} from '../models/patient.model';
import { id } from 'date-fns/locale';
import { guid } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  baseUrl = environment.LocalUrl;
  constructor(private http: HttpClient) {}

  BookedAppointment() {
    this.http.get<PatientBookAppointmentDetails[]>(
      this.baseUrl + Patient.PatientBookedAppointment
    );
  }

  Edit(value: any) {
    //alert(value);

    // for(var i=0;i<value.length;i++)
    // {

    // }

    // const data = {
    //   id: guid(),
    //   title: 'Event Today',
    //   date: '2021-12-04 13:15:30',
    //   color: 'green',
    // };
    // this.http.patch<any>(
    //   'http://localhost:3000/INITIAL_EVENTS/' + `${id}`,
    //   data
    // );

    this.http
      .post<any>('http://localhost:3000/INITIAL_EVENTS/', value)
      .subscribe((value) => {
        console.log(value);
      });
  }
}
