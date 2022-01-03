import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { url } from "inspector";

import { catchError, map, observable, Observable, tap, throwError } from 'rxjs';
import { Allergy } from '../models/allergy-model';
import { Patientdetails } from '../models/patientdetails-model';
import { patientvisitdetails } from '../models/patientvisitdetails';
import { Postal } from '../models/postal-model';
import { environment, Patient } from './Url';

@Injectable({ providedIn: 'root' })
export class patientdetails {
  [x: string]: any;
  // postobj:Patientdetails=new Patientdetails();

  patientvisitdetailsobj: patientvisitdetails = new patientvisitdetails();
  constructor(private http: HttpClient) {}
  private patientdetailslist: Patientdetails[] = [];
  private patientAddressdetailslist: Postal[] = [];
  private patientVisitDetailslist: patientvisitdetails[] = [];
  private allergyList: Allergy[] = [];
  baseUrl = environment.LocalUrl;
  //patientdetailscreen
  addPost(post: Patientdetails) {
    this.http.post('http://localhost:3000/posts', post).subscribe((res) => {
      console.log(res);
    });
  }

  fetchfrombackendfromid1(id: number): Observable<Patientdetails> {
    const getuser = localStorage.getItem('USerID');
    return this.http.get<Patientdetails>('http://localhost:3000/posts/' + 9);
  }

  deletePost(id: number | undefined) {
    // this.listOfPosts.splice(index, 1);

    this.http.delete('http://localhost:3000/posts/' + id).subscribe((res) => {
      console.log(res);
    });
  }
  UpdatePatientdetails(postobj: Patientdetails, patientid: number) {
    return this.http.put<any>('http://localhost:3000/posts/' + 2, postobj);
  }

  getCountrynamefrompincodconsole(Countrycode: string, pincode: Number) {
    return this.http.get<any>(
      'https://api.worldpostallocations.com/?postalcode=' +
        pincode +
        '&countrycode=' +
        Countrycode
    );
  }
  //get allergy list for dropdown
  getallergydata() {
    //return this.http.get<Allergy[]>('http://localhost:3000/Allergy')
    return this.http.get<Allergy[]>('http://localhost:3000/Allergy');
  }
  getAllerynamefromallergytype(AllergyType: string) {
    return this.http.get<Allergy[]>(
      'http://localhost:3000/Allergy?AllergyType=' + AllergyType
    );
  }
  //patientvisitdetails

  Addpatientvisitdetails(patientvisitobj: patientvisitdetails) {
    this.http
      .post('http://localhost:3000/visitdetails', patientvisitobj)
      .subscribe((res) => {
        console.log(res);
      });
  }

  UpdatePatientvisitdetails(
    patientvisitdetailsobj: patientvisitdetails,
    patientid: number
  ) {
    return this.http.put<any>(
      'http://localhost:3000/visitdetails',
      patientvisitdetailsobj
    );
  }


  Getpatientvisitdetailsfromid(id: number) {
    const getuser = localStorage.getItem('USerID');
    return this.http.get<patientvisitdetails>(
      'http://localhost:3000/visitdetails/' + id
    );
  }


  Getpatientvisitdetailsfrompatientid(
    id: number
  ): Observable<patientvisitdetails> {
    const getuser = localStorage.getItem('USerID');
    return this.http.get<patientvisitdetails>(
      'http://localhost:3000/visitdetails?patientid=1'
    );
  }
  GetDiagnosisdetails() {
    return this.http.get<any>('http://localhost:3000/diagnosisdetails');
  }
  GetProceduredetails() {
    return this.http.get<any>('http://localhost:3000/proceduredetails');
  }
  GetMedicationdetails() {
    return this.http.get<any>('http://localhost:3000/Medicationdetails');
  }
  GetidfromDiagnosisdetails(diagnosisdetails: string) {
    return this.http.get<any>(
      'http://localhost:3000/diagnosisdetails?Discription' + diagnosisdetails
    );
  }
  GetPreviousvisitdetails() {
    return this.http.get<any>(
      'http://localhost:3000/previousvisitdetails?PatientID=4'
    );
  }
  Updatepreviousvisitdetails() {}

  Observeevent() {
    const $http = new Observable((observer) => {
      fetch(this.baseUrl + '/visitdetails')
        .then((res) => {
          return res.json();
        })

        .then((body) => {
          observer.next(body);

          observer.complete();
        })

        .catch((err) => {
          observer.error(err);
        });
    });
  }
}
