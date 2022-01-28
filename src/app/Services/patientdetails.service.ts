import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { url } from "inspector";

import { catchError, map, observable, Observable, tap, throwError } from 'rxjs';
import { Allergy } from '../models/allergy-model';
import { PatientdetailsDemo } from '../models/patientdetails-model';
import { patientvisitdetails } from '../models/patientvisitdetails';
import { Postal } from '../models/postal-model';
import { environment, Patient } from './Url';

@Injectable({ providedIn: 'root' })
export class patientdetails {
  [x: string]: any;
  // postobj:Patientdetails=new Patientdetails();

  patientvisitdetailsobj: patientvisitdetails = new patientvisitdetails();
  constructor(private http: HttpClient) { }
  private patientdetailslist: PatientdetailsDemo[] = [];
  private patientAddressdetailslist: Postal[] = [];
  private patientVisitDetailslist: patientvisitdetails[] = [];
  private allergyList: Allergy[] = [];
  baseUrl = environment.LocalUrl;
  //patientdetailscreen
  addPost(post: PatientdetailsDemo) {
    this.http.post('https://localhost:44315/api/Demographicsdetails/PostPatientdemographicsdetails', post).subscribe((res) => {
      console.log(res);
    });
  }

  fetchfrombackendfromid1(id: any) {

    return fetch(`https:localhost:44315/api/Demographicsdetails?Patientid=${id}`, {
      method: 'GET',
      redirect: 'follow'
    })

  }

  deletePost(id: number | undefined) {
    // this.listOfPosts.splice(index, 1);

    this.http.delete('http://localhost:3000/posts/' + id).subscribe((res) => {
      console.log(res);
    });
  }
  UpdatePatientdetails(demoid:string,postobj: PatientdetailsDemo) {
    // alert("hiiservice
    // console.log(postobj);  
    // return this.http.put(`https://localhost:44315/api/Demographicsdetails/UpdateDemographic`,postobj);
 console.log(demoid);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");



    var raw = JSON.stringify(postobj);
    //var result = raw.slice(1, -1);
   // var result = JSON.parse(raw);

   return fetch(`https://localhost:44315/api/Demographicsdetails/UpdateDemographic?Demoid=${demoid}`, {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      

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

    return fetch(`https://localhost:44315/api/Master/GetallAllergydetails`, {
      method: 'GET',
      redirect: 'follow'
    })
  }
  getAllerynamefromallergytype(AllergyType: string) {
    return fetch(`https://localhost:44315/api/Master/GetdetailsfromAllergytype?AllergyType=${AllergyType}`, {
      method: 'GET',
      redirect: 'follow'
    })
  }
  //patientvisitdetails

  Addpatientvisitdetails(patientvisitobj: patientvisitdetails) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");



    var raw = JSON.stringify(patientvisitobj);
    console.log(raw);
    //var result = raw.slice(1, -1);
   // var result = JSON.parse(raw);

    fetch("https://localhost:44315/api/PatientDetails", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
alert('hii');
  }

  UpdatePatientvisitdetails(
    patientvisitdetailsobj: patientvisitdetails,
    patientid: number
  ) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(patientvisitdetailsobj);
    //var result = raw.slice(1, -1);
   // var result = JSON.parse(raw);
console.log(raw);
    fetch("https://localhost:44315/api/PatientDetails/PutPatientDetails?id=CD0F9BD5-4320-496E-8C3F-08D9DD8C9F7B", {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  Getpatientvisitdetailsfromid(id: number) {
    const getuser = localStorage.getItem('USerID');
     return fetch(`https://localhost:44315/api/PatientDetails?Appointmentid=93666A3C-9684-4BB1-73BA-08D9DD8C4FC3`, {
        method: 'GET',
        redirect: 'follow'
      });
  }


  Getpatientvisitdetailsfrompatientid(id: any)
  {
    const getuser = localStorage.getItem('USerID');
    
    return this.http.get<any>('https://localhost:44315/api/Master/Getdiagnosisdetails');
    
  }
  GetDiagnosisdetails() {
    return this.http.get<any>('https://localhost:44315/api/Master/Getdiagnosisdetails');
  }
  GetProceduredetails() {
    return this.http.get<any>('https://localhost:44315/api/Master/Getproceduredetails');
  }
  GetMedicationdetails() {
    return this.http.get<any>('https://localhost:44315/api/Master/Getdrugdetails');
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
  Updatepreviousvisitdetails() { }

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
