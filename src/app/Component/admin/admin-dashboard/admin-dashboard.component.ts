import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
=======
import { map, Observable } from 'rxjs';

// import { AdminDashboard } from '../model/admin.model';
import { AdminService } from 'src/app/Services/admin.service';
>>>>>>> d4e2f2f2174312342a5d7024e1ceba2e61cab6d8
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
<<<<<<< HEAD

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() { }
=======
  //adminDashboard!: Observable<AdminDashboard>;
  constructor(private adminservice: AdminService) {}
>>>>>>> d4e2f2f2174312342a5d7024e1ceba2e61cab6d8

  ngOnInit(): void {
    // this.adminservice.LoadDashBoardInfo().subscribe((x) => {
    //   this.adminDashboard = x[0];
    //   //console.log(x[0].Appointments);
    // });
    // this.adminDashboard = this.adminservice.LoadDashBoardInfo().pipe(
    //   map(
    //     (response) =>
    //       ({
    //         Appointments: response.Appointments,
    //         LockedAccount: response.LockedAccount,
    //       } as AdminDashboard)
    //   )
    // );
    //console.log(this.adminDashboard);
  }
}
