import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  Onsubmit(){
    console.log("vamsiclicked")
    this.router.navigateByUrl('/AppointmentView');
  }

}
