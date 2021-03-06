import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/appointment';
import { Attendance, Specialization } from 'src/app/models/Attendance';
import { Bardata } from 'src/app/models/bardata';
import { Booking, Employee } from 'src/app/models/patient.model';
import { Appointment, environment } from '../Url';

@Injectable({
  providedIn: 'root',
})
export class PhysicianService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = 'https://localhost:44347/api/Appointments';

  private readonly BAR_URL = 'http://localhost:3000/BarList';
  private readonly API_URL_NEXTPATIENT =
    'https://localhost:44318/api/PhysicianDashboard/GetNextAppointment';
  // baseUrl = environment.AppointmentUrl;
  appointmentData: any;

  addPhysicianPost(employee: Attendance) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var raw = JSON.stringify(employee);
    return fetch('https://localhost:44318/api/PhysicianDashboard', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
  }

  // getPatient() {
  //   return this.http.get<UserDetails[]>('https://localhost:44318/api/AdminUserInfo/GetPatientUsers');
  // }

  //   getAppointmentData(): Observable<Booking[]>{

  //     return this.http.get<Booking[]>(this.baseUrl + Appointment.AppointmentGrid);
  // }

  GetAllSpecialization() {
    return this.http.get<Specialization[]>(
      'https://localhost:44318/api/PhysicianDashboard/GetAllSpecialization'
    );
  }

  getAppointmentnextpatientData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL_NEXTPATIENT);
  }

  GetAppoinmentRequest(id: string, date: string) {
    return this.http.get<any[]>(
      ` https://localhost:44347/api/Appointments/GetEditBookAppointmentDetails/${id}`
    );
  }

  //  getBartData() : Observable<Bardata[]>{

  //    return this.http.get<Bardata[]>(this.BAR_URL);
  //  }
}
