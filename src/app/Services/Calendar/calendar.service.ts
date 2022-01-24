import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventMap } from 'src/app/models/admin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  //Url Route
  baseUrl = environment.Appointment;
  constructor(private http: HttpClient) {}

  GetListofData() {
    return this.http.get<EventMap[]>(this.baseUrl + 'GetAllAppointments');
  }

  ApproveReject(Id: any, Type: string) {
    return fetch(
      `https://localhost:44347/api/Appointments/ApproveReject/${Id}?Status=${Type}`,
      {
        method: 'PATCH',
        redirect: 'follow',
      }
    );
  }
}
