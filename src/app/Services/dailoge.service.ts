import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventInput } from '@fullcalendar/angular';
 
import { Appointment, environment } from '../Services/Url';
import { EventMap } from '../Component/admin/model/admin.model';
import { Product } from '../models/appointment';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctordata';
import { Bardata } from '../models/bardata';
// import { EventData } from '../Component/admin/admin-calendar/admin-calendar.component';

@Injectable({
  providedIn: 'root',
})
export class DailogeService  {
  constructor(private http: HttpClient) {}

  //Url Route
  private readonly API_URL = 'http://localhost:3000/DoctorList';
  private readonly BAR_URL = 'https://localhost:44355/api/NurseDash/GetallBarChartDetails';
  private readonly UP_URL = 'http://localhost:3000/UPCOMINGAPPOINTMENT_DATA';
  
  baseUrl = environment.LocalUrl;
  appointmentData: any;

  //Dash Board Changes Start

  getAppointmentData(): Observable<Product[]>{
    
         return this.http.get<Product[]>(this.baseUrl + Appointment.AppointmentGrid);
  }
  updateIssue(product: Product): void {
    this.appointmentData = product;
    this.http.post('http://localhost:3000/APPOINTMENT_DATA',  this.appointmentData).subscribe((res) => {
      console.log("datacame");  
    });
    
    
  }

  addAppoinmentData(product: Product) {
    console.log("calcame"); 
    console.log(product.id);
    // this.listOfPosts.push(post);
    // this.http.patch('http://localhost:3000/APPOINTMENT_DATA' ,product).subscribe((res) => {
      
      this.http.put<any>('http://localhost:3000/APPOINTMENT_DATA/3',product).subscribe((res) => {;
      console.log(product.id); 
     
    });
  }

  deletePostapp(id: number | undefined) {
    // this.listOdeletefPosts.splice(index, 1);
    console.log("deletevalue"+id)
    this.http.delete('http://localhost:3000/APPOINTMENT_DATA/' + id).subscribe((res) => {
    console.log(res);
    this.getAppointmentData();
   
    });
    }
    getDoctorListData() : Observable<Doctor[]>{
    
        return this.http.get<Doctor[]>(this.API_URL);
      }
     
      getUpcomingAppointments(): Observable<Product[]>{
    
        return this.http.get<Product[]>(this.UP_URL);
 }
      getBartData() : Observable<Bardata[]>{
    
        return this.http.get<Bardata[]>(this.BAR_URL);
      }

  //Dash Board Changes End

  //Calendar Changes Start
  //Data Mappingrtf
  // private listEvent: EventMap[] = [];

  // GetEventData(): Promise<EventInput[]> {
  //   return Promise.resolve(INITIAL_EVENTS);
  // }

  //Call Events Before loading to Component
  // GetData() {
  //   this.http
  //     .get<EventMap[]>(this.baseUrl + Admin.Event)
  //     .subscribe((res: EventMap[]) => {
  //       this.listEvent.splice(0, this.listEvent.length);
  //       this.listEvent.push(...res);
  //     });
  // }

  //List Of ALL Events
  // GetListofData() {
  //   return this.http.get<EventMap[]>(this.baseUrl + Admin.Event);
  // }

  //Calendar Changes End
}

