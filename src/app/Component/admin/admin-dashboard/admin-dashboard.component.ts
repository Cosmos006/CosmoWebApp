import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, noop } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  Appointments: number = 0;
  LockedAccount: number = 0;
  constructor(private adminservice: AdminService, private router: Router) {}
  ngOnInit(): void {
    this.adminservice.GetAdminDashboard().subscribe((x) => {
      this.Appointments = x[0].Appointments;
      this.LockedAccount = x[0].LockedAccount;
    });

    this.adminservice.Observeevent().subscribe((res) => {
      console.log(res);
    });

    const $http = this.adminservice.TempGetAdminData();

    const $data = $http.pipe(map((res) => alert(res)));

    this.adminservice.TestData().subscribe((res) => {
      console.log(res);
      alert(res);
    });
  }

  DashboardRedirectURL(navigate: any) {
    if (navigate == 'locked') {
      this.router.navigateByUrl('/LockedAccount');
    } else if (navigate == 'patient') {
      this.router.navigateByUrl('/AdminPatient');
    } else if (navigate == 'hospital') {
      this.router.navigateByUrl('/AdminHospital');
    }
  }
}
