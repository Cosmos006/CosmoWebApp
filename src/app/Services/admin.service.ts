import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventInput } from '@fullcalendar/angular';
import { INITIAL_EVENTS } from '../Component/admin/model/event.utils';
import { ApiPaths, environment } from '../Services/Url';
import { EventMap } from '../Component/admin/model/admin.model';
// import { EventData } from '../Component/admin/admin-calendar/admin-calendar.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  //Url Route
  baseUrl = environment.LocalUrl;

  //Data Mapping
  private listEvent: EventMap[] = [];

  GetEventData(): Promise<EventInput[]> {
    return Promise.resolve(INITIAL_EVENTS);
  }

  //Call Events Before loading to Component
  GetData() {
    this.http
      .get<EventMap[]>(this.baseUrl + ApiPaths.Event)
      .subscribe((res: EventMap[]) => {
        this.listEvent.splice(0, this.listEvent.length);
        this.listEvent.push(...res);
      });
  }

  //List Of ALL Events
  GetListofData() {
    return this.http.get<EventMap[]>(this.baseUrl + ApiPaths.Event);
  }
}
