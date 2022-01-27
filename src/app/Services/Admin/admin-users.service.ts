import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminPatient } from 'src/app/models/admin.model';
import { environment } from 'src/environments/environment';
import { GetAdminHospiatlUser } from '../Url';
import { HospitalUser } from 'src/app/models/HospitalUser';
import { AnyObject } from 'chart.js/types/basic';

export interface ICustomWindow extends Window {
  _custom_global_stuff: string;
}
function getWindow(): any {
  return window;
}

function _window(): any {
  // return the global native browser window object
  return window;
}

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

    // return this.http.get<HospitalUser[]>(
    //   'https://localhost:44318/api/EmployeRegister'
    // );

    return this.http.get<HospitalUser[]>(
      'https://localhost:44318/api/AdminUserInfo'
    );
  }

  AdminLockHospitalUsers(id: string, Status: boolean, Type: string) {
    const PatientID = id;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return fetch(
      `https://localhost:44318/api/AdminUserInfo/HospitalLocked/${PatientID}?Status=${Status}&Type=${Type}`,
      {
        method: 'PUT',
        redirect: 'follow',
      }
    );
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

  // get nativeWidow(): ICustomWindow {
  //   return getWindow();
  // }

  get nativeWindow(): any {
    return _window();
  }
}
