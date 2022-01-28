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
    this.http
      .post<any>('http://localhost:3000/INITIAL_EVENTS/', value)
      .subscribe((value) => {
        console.log(value);
      });
  }

  GetPatientAppointmentDetailsById(AppointmentID: string) {
    return this.http.get<any>(
      `https://localhost:44347/api/Appointments/GetEditBookAppointmentDetails/${AppointmentID}`
    );
  }
}
