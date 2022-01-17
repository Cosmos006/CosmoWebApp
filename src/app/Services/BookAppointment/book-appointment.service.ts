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

  //GEt Physician
  GetPhysician() {
    return this.http.get<Diagnosics[]>(
      'https://localhost:44347/api/Diagnoses/GetDiagnosisData'
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
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify(value);

    // return this.http.post<any>('https://localhost:44347/api/Appointments', {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // });
    // .subscribe({
    //   next: (data) => {
    //     alert(data);
    //   },
    //   error: (error) => {
    //     const errorMessage = error.message;
    //     console.log('There was an error!' + error);
    //   },
    // });

    return fetch('https://localhost:44347/api/Appointments', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }
}
