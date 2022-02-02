import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/appointment';
import { Attendance } from 'src/app/models/Attendance';
import { Bardata } from 'src/app/models/bardata';
import { Booking } from 'src/app/models/patient.model';
import { UserDetails } from 'src/app/models/UserDetails';
import { Appointment, environment } from '../Url';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  constructor(private http:HttpClient) { }

  private readonly API_URL = 'https://localhost:44347/api/Appointments';

  private readonly BAR_URL = 'http://localhost:3000/BarList';
 private readonly API_URL_NEXTPATIENT = 'https://localhost:44318/api/PhysicianDashboard/GetNextAppointment';
 // baseUrl = environment.AppointmentUrl;
  appointmentData: any;


 addPhysicianPost(employee: Attendance) {
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(employee);

  console.log(raw);

  //var result = raw.slice(1, -1);

 // var result = JSON.parse(raw);

 //localhost:44318/api/PhysicianAvailablity/

  fetch("https://localhost:44318/api/PhysicianDashboard", {
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

 
 
  // getPatient() {
  //   return this.http.get<UserDetails[]>('https://localhost:44318/api/GetAvailablePhysicianDetails');
  // }


//   getAppointmentData(): Observable<Booking[]>{
    
//     return this.http.get<Booking[]>(this.baseUrl + Appointment.AppointmentGrid);
// }



getAppointmentnextpatientData() : Observable<Product[]>{

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
