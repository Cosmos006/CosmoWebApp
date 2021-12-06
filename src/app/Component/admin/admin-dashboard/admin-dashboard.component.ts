import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AdminDashboard } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/Services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  adminDashboard!: Observable<AdminDashboard>;
  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    // this.adminservice.LoadDashBoardInfo().subscribe((x) => {
    //   this.adminDashboard = x[0];

    //   //console.log(x[0].Appointments);
    // });

    this.adminDashboard = this.adminservice.LoadDashBoardInfo().pipe(
      map(
        (response) =>
          ({
            Appointments: response.Appointments,
            LockedAccount: response.LockedAccount,
          } as AdminDashboard)
      )
    );

    console.log(this.adminDashboard);
  }
}
