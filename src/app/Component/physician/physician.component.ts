import { Component, OnInit } from '@angular/core';

export interface UsersData {
  name: string;
  id: number;
  Status: string;
}

const ELEMENT_DATA: UsersData[] = [
  { id: 1560608769632, name: 'Sushma', Status: 'On-going' },
  { id: 1560608796014, name: 'Prabha', Status: 'Confirmed' },
  { id: 1560608787815, name: 'Arvind', Status: 'Failed' },
  { id: 1560608805101, name: 'Archana', Status: 'Confirmed' },
];
export interface Patient {
  Weight: number;
  LastAppoinment: string;
  name: string;
  RegisterDate: string;
  Gender: string
  Dateofbirth: string;

}

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css'],
})
export class PhysicianComponent implements OnInit {
  dataSource: Patient[] = [
    { name: 'Amit', Dateofbirth: '02/12/1999', Weight: 50, RegisterDate: '2021-12-04 13:15:30', Gender: 'female', LastAppoinment: '2021-12-04 13:15:30' },
    { name: 'Jyoti', Dateofbirth: '02/12/1999', Weight: 50, RegisterDate: '2021-12-04 13:15:30', Gender: 'female', LastAppoinment: '2021-12-04 13:15:30' },
    { name: 'Shruti', Dateofbirth: '02/12/1999', Weight: 50, RegisterDate: '2021-12-04 13:15:30', Gender: 'female', LastAppoinment: '2021-12-04 13:15:30' },
    { name: 'latha', Dateofbirth: '02/12/1999', Weight: 50, RegisterDate: '2021-12-04 13:15:30', Gender: 'female', LastAppoinment: '2021-12-04 13:15:30' },
    { name: 'anita', Dateofbirth: '02/12/1999', Weight: 50, RegisterDate: '2021-12-04 13:15:30', Gender: 'female', LastAppoinment: '2021-12-04 13:15:30' },
  ];
  displayedColumns: string[] = ['name', 'Dateofbirth', 'Weight', 'RegisterDate', 'Gender', 'LastAppoinment', 'action'];

  displayedColumns1: string[] = ['id', 'name', 'Status', 'action'];
  dataSource1 = ELEMENT_DATA;
  displayedColumns2: string[] = ['id', 'name', 'action'];
  dataSource2 = ELEMENT_DATA;

  constructor() { }

  Patient: any = 10;
  ngOnInit(): void { }
}
