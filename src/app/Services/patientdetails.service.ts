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
    this.http.post('https://localhost:5001/api/Demographicsdetails/PostPatientdemographicsdetails', post).subscribe((res) => {
      console.log(res);
    });
  }

  fetchfrombackendfromid1(id: any) {

    return fetch(`https://localhost:5001/api/Demographicsdetails?Patientid=${id}`, {
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
  UpdatePatientdetails(demoid: string, postobj: PatientdetailsDemo) {
    console.log(demoid);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(postobj);
    console.log(raw);
    
    return fetch(`https://localhost:5001/api/Demographicsdetails/UpdateDemographic/${demoid}`, {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    });


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

    return fetch(`https://localhost:5001/api/Master/GetallAllergydetails`, {
      method: 'GET',
      redirect: 'follow'
    })
  }
  getAllerynamefromallergytype(AllergyType: string) {

    

    return fetch(`https://localhost:5001/api/Master/GetdetailsfromAllergytype?AllergyType=${AllergyType}`, {
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

    fetch("https://localhost:5001/api/PatientDetails", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  }

  UpdatePatientvisitdetails(
    patientvisitdetailsobj: patientvisitdetails,
    visitid:string
  ) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(patientvisitdetailsobj);
   console.log(raw);
    fetch(`https://localhost:5001/api/PatientDetails/PutPatientDetails?id=${visitid}`, {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
     
  }


  Getpatientvisitdetailsfromid(id:string) {
    const getuser = localStorage.getItem('USerID');
    return fetch(`https://localhost:5001/api/PatientDetails?Appointmentid=78871310-CDF2-46C9-99EE-08D9E24B6FE1`, {
      method: 'GET',
      redirect: 'follow'
    });
  }


  Getpatientvisitdetailsfrompatientid(id: any) {
    const getuser = localStorage.getItem('USerID');

    return this.http.get<any>('https://localhost:5001/api/Master/Getdiagnosisdetails');

  }
  GetRole(id:any)
  {
    alert(id + 'hii');
    return fetch(`https://localhost:5001/api/Master?id=${id}`, {
      method: 'GET',
      redirect: 'follow'
    })
  }
  GetDiagnosisdetails() {
    return this.http.get<any>('https://localhost:5001/api/Master/Getdiagnosisdetails');
  }
  GetProceduredetails() {
    return this.http.get<any>('https://localhost:5001/api/Master/Getproceduredetails');
  }
  GetMedicationdetails() {
    return this.http.get<any>('https://localhost:5001/api/Master/Getdrugdetails');
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
