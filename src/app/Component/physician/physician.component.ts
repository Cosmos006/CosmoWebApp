import { Component, OnInit } from '@angular/core';

export interface UsersData {
  name: string;
  id: number;
  Status: string;
}

const ELEMENT_DATA: UsersData[] = [
  { id: 1560608769632, name: 'Artificial Intelligence', Status: 'On-going' },
  { id: 1560608796014, name: 'Machine Learning', Status: 'Confirmed' },
  { id: 1560608787815, name: 'Robotic Process Automation', Status: 'Failed' },
  { id: 1560608805101, name: 'Blockchain', Status: 'Confirmed' },
];
export interface Food {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css'],
})
export class PhysicianComponent implements OnInit {
  dataSource: Food[] = [
    { name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4 },
    { name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4 },
  ];
  displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs', 'protein'];

  displayedColumns1: string[] = ['id', 'name', 'Status', 'action'];
  dataSource1 = ELEMENT_DATA;
  displayedColumns2: string[] = ['id', 'name', 'action'];
  dataSource2 = ELEMENT_DATA;

  constructor() {}

  Patient: any = 10;
  ngOnInit(): void {}
}
