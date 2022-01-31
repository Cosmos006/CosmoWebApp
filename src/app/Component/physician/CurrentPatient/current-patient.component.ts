import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { UserDetails } from 'src/app/models/UserDetails';
import { PhysicianService } from 'src/app/Services/Physician/physician.service';

@Component({
  selector: 'app-current-patient',
  templateUrl: './current-patient.component.html',
  styleUrls: ['./current-patient.component.css']
})
export class CurrentPatientComponent implements OnInit {
  dataSource1 !: MatTableDataSource<UserDetails>;
  constructor(public physicianservice: PhysicianService,private titleService:Title) { }

  ngOnInit(): void {
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
 
  displayedColumnsappoinment = ['patientName', 'PhoneNumber' , 'Diagnosis' ,  'Age' , 'DOB'  ,'action'];
 
  getPatientdata() {
    this.physicianservice.getpatient().subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data)    
      console.log(this.dataSource1)
    });
  }
}
