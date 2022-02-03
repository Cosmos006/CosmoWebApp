import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminPatient } from 'src/app/models/admin.model';
import { environment } from 'src/environments/environment';
import { GetAdminHospiatlUser } from '../Url';
import { HospitalUser } from 'src/app/models/HospitalUser';
import { AnyObject } from 'chart.js/types/basic';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  // baseUrl = environment.LocalUrl;
  baseUrl = environment.Url;
  constructor(private http: HttpClient) {}

  //Hospital Users

  GetAdminHospitalUsers() {
    return this.http.get<HospitalUser[]>(
      'https://localhost:44318/api/AdminUserInfo'
    );
  }

  AdminLockHospitalUsers(id: string, Status: boolean, Type: string) {
    const PatientID = id;
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }

    return fetch(
      `https://localhost:44318/api/AdminUserInfo/HospitalLocked/${PatientID}?Status=${Status}&Type=${Type}`,
      {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }

  GetPatientHospitalUsers() {
    return this.http.get<AdminPatient[]>(
      'https://localhost:44318/api/AdminUserInfo/GetPatientUsers'
    );
  }

  PatientLockHospitalUsers(id: string, Status: boolean, Type: string) {
    const PatientID = id;
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token != null) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }

    return fetch(
      `https://localhost:44318/api/AdminUserInfo/PatientActive/${PatientID}?Status=${Status}&Type=${Type}`,
      {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
  }
}
