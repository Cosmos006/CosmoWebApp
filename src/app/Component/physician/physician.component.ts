import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/Attendance';
import { PhysicianService } from 'src/app/Services/Physician/physician.service';


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

  SlotList?: Array<string>;

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
  Slots = new FormControl();

  listOfPosts: Attendance[] = [];
  form: FormGroup = new FormGroup({});
  empdata!: Attendance;




  listOfslot: string[] = ['9:30 to 10:30', '10:30 to 11', '10:30 to 11:30', '9:30 to 10:30', '9:30 to 10:30', '9:30 to 10:30'];
  makes: any[];
  constructor(public physicianservice: PhysicianService) {
    this.makes = [];
  }


  Patient: any = 10;
  ngOnInit(): void {
    var Get = localStorage.getItem('currentUser');
    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;

    }
    this.form = new FormGroup({
      physicianid: new FormControl(id, null),
      date: new FormControl([Validators.required]),
      timeslot: new FormControl([Validators.required]),

    });
    this.SlotList = ['9:30 to 10:30', '10:30 to 11', '10:30 to 11:30', '9:30 to 10:30', '9:30 to 10:30', '9:30 to 10:30'];
  }


  // getPhysicianDetails() {
  //   this.physicianservice.getPhysicianDetails().subscribe((x) => {
  //     this.listOfPosts.push(...x);
  //     for (let i = 0; i < this.listOfPosts.length; i++) {
  //       this.listOfslot.push(this.listOfPosts[i].timeslot.toString());
  //       var mySet = new Set(this.listOfslot);
  //       this.listOfslot = [...mySet];
  //       console.log(mySet);
  //     }
  //   });
  // }


  AddPhysiciandetails(index: number) {
    // console.log(this.form);
    // var empdetails = new EmployeeDetails();
    // empdetails.id = this.form.value.physicianid
    //   , empdetails.date = this.form.value.date, empdetails.timeslot = this.form.value.timeslot;
    // this.physicianservice.addPhysicianPost(empdetails);

    var dataemployee:Attendance ={
      physicianId: this.form.value.physicianid,
      date: this.form.value.date,
      timeSlotlist: this.form.value.timeslot,
    }
  this.physicianservice.addPhysicianPost(dataemployee);

}
}

