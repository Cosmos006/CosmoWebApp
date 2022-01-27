import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Deactivate,
  AdminPatient,
  SoftDelete,
} from 'src/app/models/admin.model';
import { UsersData } from '../../physician/physician.component';

const Deactive_DATA: Deactivate[] = [
  {
    firstName: 'Akash',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 1,
  },
  {
    firstName: 'Ram',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 2,
  },
  {
    firstName: 'Bob',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 3,
  },
  {
    firstName: 'Harley',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 4,
  },
  {
    firstName: 'Ram',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 5,
  },
];

const SoftDelete_DATA: SoftDelete[] = [
  {
    firstName: 'Akash',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 1,
  },
  {
    firstName: 'Ram',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 2,
  },
  {
    firstName: 'Bob',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 3,
  },
  {
    firstName: 'Harley',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 4,
  },
  {
    firstName: 'Ram',
    contact: 7898765456,
    email: 'Test@123',
    isActive: false,
    id: 5,
  },
];

const User_DATA: AdminPatient[] = [
  {
    title: 'Mr',
    firstName: 'Ram',
    lastName: 'Sham',
    contact: 7898765456,
    specialization: 'Test',
    email: 'Test@123',
    createdOn: '2022-01-07T05:39:25.716',
    isActive: false,
    id: 1,
  },
  {
    title: 'Mr',
    firstName: 'Alen',
    lastName: 'K',
    contact: 7898765456,
    specialization: 'Test',
    email: 'AlenTest@123',
    createdOn: '2022-01-07T05:39:25.716',
    isActive: true,
    id: 2,
  },
  {
    title: 'Mr',
    firstName: 'Bob',
    lastName: 'K',
    contact: 7898765456,
    specialization: 'Test',
    email: 'BobTest@123',
    createdOn: '2022-01-07T05:39:25.716',
    isActive: true,
    id: 3,
  },
  {
    title: 'Mr',
    firstName: 'Jhon',
    lastName: 'K',
    contact: 7898765456,
    specialization: 'Test',
    email: 'JhonTest@123',
    createdOn: '2022-01-07T05:39:25.716',
    isActive: true,
    id: 4,
  },
  {
    title: 'Mr',
    firstName: 'Carl',
    lastName: 'K',
    contact: 7898765456,
    specialization: 'Test',
    email: 'CarlTest@123',
    createdOn: '2022-01-07T05:39:25.716',
    isActive: true,
    id: 5,
  },
  {
    title: 'Mr',
    firstName: 'Carl',
    lastName: 'K',
    contact: 7898765456,
    specialization: 'Test',
    email: 'CarlTest@123',
    createdOn: '2022-01-07T05:39:25.716',
    isActive: false,
    id: 6,
  },
];

@Component({
  selector: 'app-admin-patient',
  templateUrl: './admin-patient.component.html',
  styleUrls: ['./admin-patient.component.css'],
})
export class AdminPatientComponent implements AfterViewInit {
  PatientdataSource: MatTableDataSource<AdminPatient>;
  DeactivePatientdataSource: MatTableDataSource<Deactivate>;
  SoftDeletePatientdataSource: MatTableDataSource<SoftDelete>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    // Create 100 users
    // Assign the data to the data source for the table to render
    this.PatientdataSource = new MatTableDataSource(User_DATA);
    this.DeactivePatientdataSource = new MatTableDataSource(Deactive_DATA);
    this.SoftDeletePatientdataSource = new MatTableDataSource(SoftDelete_DATA);
  }

  displayedoneColumns: string[] = [
    'id',
    'firstName',
    'contact',
    'email',
    'isActive',
  ];
  displayedtwoColumns: string[] = [
    'id',
    'firstName',
    'contact',
    'email',
    'isActive',
  ];
  displayedthreeColumns: string[] = [
    'id',
    'firstName',
    'contact',
    'specialization',
    'isActive',
  ];
  // patientdatasource = new MatTableDataSource<Patient>(User_DATA);

  updateActiveStatus(element: any) {
    console.log(element);
    //alert('Original:' + element.isActive);
    var change = (element.activate = !element.activate);
    //alert('Changes1:' + change);
    alert('Changes2:' + !element.isActive);
  }

  DeactivaeapplyFilter(event: Event) {
    // alert(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.DeactivePatientdataSource.filter = filterValue.trim().toLowerCase();

    if (this.DeactivePatientdataSource.paginator) {
      this.DeactivePatientdataSource.paginator.firstPage();
    }
  }

  SoftDeleteapplyFilter(event: Event) {
    // alert(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.DeactivePatientdataSource.filter = filterValue.trim().toLowerCase();

    if (this.DeactivePatientdataSource.paginator) {
      this.DeactivePatientdataSource.paginator.firstPage();
    }
  }

  PatientapplyFilter(event: Event) {
    // alert(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.PatientdataSource.filter = filterValue.trim().toLowerCase();

    if (this.PatientdataSource.paginator) {
      this.PatientdataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    //Deactivate Patient
    this.DeactivePatientdataSource.paginator = this.paginator;
    this.DeactivePatientdataSource.paginator = this.paginator;

    //Soft Delete
    this.SoftDeletePatientdataSource.paginator = this.paginator;
    this.SoftDeletePatientdataSource.paginator = this.paginator;

    //Patient
    this.PatientdataSource.paginator = this.paginator;
    this.PatientdataSource.sort = this.sort;
  }
}
