import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Observable } from 'rxjs';
import { Booking, Diagnosics, Physician } from '../../models/patient.model';
@Injectable({
  providedIn: 'root',
})
export class BookAppointmentService {
  constructor(private http: HttpClient) {}

  //GetBookSlot
  GetBookSlot(id: string, date: string) {
    return this.http.get<any[]>(
      `https://localhost:44347/api/Appointments/GetBookSlots/${id}?appointmentdateTime=${date}`
    );
  }

  //GetDiagnosics
  GetDiagnosics() {
    return this.http.get<Diagnosics[]>(
      'https://localhost:44347/api/Diagnoses/GetDiagnosisData'
    );
  }

  GetSpecialization() {
    return this.http.get<Diagnosics[]>(
      'https://localhost:44347/api/Appointments/Specialization'
    );
  }

  //GEt Physician
  // GetPhysician() {
  //   return this.http.get<Physician[]>(
  //     'https://localhost:44347/api/Appointments/GetAllPhysician'
  //   );
  // }

  GetPhysicianById(Diagnosics: string) {
    return this.http.get<Physician[]>(
      `https://localhost:44347/api/Appointments/GetPhysicianByDiagnosics/${Diagnosics}`
    );
  }

  //Get Time Slot
  GetAllocatedTimeSlot() {
    return this.http.get<Diagnosics[]>(
      'https://localhost:44347/api/Diagnoses/GetDiagnosisData'
    );
  }

  //Post Appointment
  BookAppointmentPost(value: any) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch('https://localhost:44347/api/Appointments', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }

  UpdateAppointment(AppointmentId: string, value: any) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(value);
    return fetch(
      `https://localhost:44347/api/Appointments/UpdateAppointments/${AppointmentId}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
    );
  }
}
