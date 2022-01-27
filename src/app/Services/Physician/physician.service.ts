import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/Attendance';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  constructor(private http:HttpClient) { }


 addPhysicianPost(employee: Attendance) {
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(employee);

  console.log(raw);

  //var result = raw.slice(1, -1);

 // var result = JSON.parse(raw);

 //localhost:44318/api/PhysicianAvailablity/

  fetch("https://localhost:44318/api/PhysicianAvailablity", {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })

    .then(response => response.text())

    .then(result => console.log(result))

    .catch(error => console.log('error', error));
    // this.http.post('https://localhost:44318/api/SavePhysician', employee).subscribe((res) => {
    //   console.log(res);
    // });
  }

 
 
  getPhysicianDetails() {
    return this.http.get<Attendance[]>('https://localhost:44318/api/GetAvailablePhysicianDetails');
  }




}
