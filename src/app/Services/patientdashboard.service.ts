import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient, environment } from './Url';
import { AppointmentData } from '../models/patientDashboard';
@Injectable({
  providedIn: 'root',
})
export class PatientDashboardService {
  baseUrl = environment.LocalUrl;
  constructor(private http: HttpClient) {}

  GetAllAppointmentList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.Appointment
    );
  }

  GetAllUpcomingAppointmentList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.UpcomingAppointment
    );
  }
  GetPastAppointmentList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.PastAppointment
    );
  }
  GetDeclineAppointmentsList() {
    return this.http.get<AppointmentData[]>(
      this.baseUrl + Patient.DeclineAppointments
    );
  }
  GetAppointmentById(id : string) {
    return this.http.get<AppointmentData>(
      this.baseUrl + Patient.Appointment + '/'+id
    )
  }

 

}
