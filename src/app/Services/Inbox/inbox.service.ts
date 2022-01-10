import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';


@Injectable({ providedIn: 'root' })
export class InboxService{

    baseUrl : string = 'https://localhost:44311/api/'

    constructor(private httpClient: HttpClient, private router: Router){

    }
    
    SendNotes(notes : any){
        return this.httpClient.post(this.baseUrl + 'Inbox', notes);
    }

    GetEmployee(){
        return this.httpClient.get(this.baseUrl + 'Inbox/GetEmployee');
    }

    GetNotes(id: Guid){
      return this.httpClient.get(this.baseUrl + 'Inbox/GetNotesById?id='+id);
  }

    DeleteEmployee(id: Guid){
      this.httpClient.delete(this.baseUrl + 'Inbox/DeleteNotes?id='+id);
    }
}