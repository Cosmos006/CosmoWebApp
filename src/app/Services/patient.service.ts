import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient, environment } from '../Services/Url';
import { PatientBookAppointmentDetails } from '../models/patient.model';
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
}
