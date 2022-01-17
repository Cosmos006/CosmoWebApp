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
    // return this.http.get<HospitalUser[]>(
    //   this.baseUrl + GetAdminHospiatlUser.GetAdminHospiatlUsers
    // );
    // return this.http.get<HospitalUser[]>(
    //   this.baseUrl + GetAdminHospiatlUser.UserDetails
    // );

    // return this.http.get<HospitalUser[]>(
    //   'https://localhost:44321/api/UserDetails'
    // );

    return this.http.get<HospitalUser[]>(
      'https://localhost:44318/api/EmployeRegister'
    );
  }

  AdminLockHospitalUsers(id: any) {
    // alert(id)
    console.log(id);
    const PatientID = id;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      title: 'string',
      firstName: 'string',
      lastName: 'string',
      contact: 0,
      specialization: 'string',
      email: 'string',
      createdOn: '2022-01-10T13:21:09.002Z',
      isActive: false,
      isDisabled: false,
      role: 'string',
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`https://localhost:44321/api/UserDetails/IsActive/${PatientID}`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    //return this.http.post<any>('https://localhost:44321/api/UserDetails',);
  }

  // return this.http.get<HospitalUser[]>(
  //   this.baseUrl + GetAdminHospiatlUser.GetAdminHospiatlUsers
  // );
  //Patient Users

  GetAdminPatientUsers(): Observable<AdminPatient> {
    return this.http.get<AdminPatient>(
      this.baseUrl + GetAdminHospiatlUser.GetAdminHospiatlUsers
    );
  }
}
