import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, noop } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { DailogeService } from 'src/app/Services/dailoge.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  Appointments!: any;
  LockedAccount: number = 0;
  constructor(
    private adminservice: AdminService,
    public appoiService: DailogeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAppointmentCount();
    this.adminservice.GetAdminDashboard().subscribe((x) => {
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
  Onappointment() {
    this.router.navigateByUrl('/AppointmentView');
  }
  getAppointmentCount() {
    this.appoiService.getAppointmentData().subscribe((data) => {
      this.Appointments = data.length;
      console.log(data);
    });
  }
}
