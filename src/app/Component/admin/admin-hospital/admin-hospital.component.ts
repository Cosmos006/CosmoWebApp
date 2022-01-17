import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { HospitalUser } from 'src/app/models/admin.model';
// import { Admi_Hospital_DATA } from 'src/app/models/AdminData';
import { HospitalUser } from 'src/app/models/HospitalUser';
import { AdminUsersService } from 'src/app/Services/Admin/admin-users.service';

@Component({
  selector: 'app-admin-hospital',
  templateUrl: './admin-hospital.component.html',
  styleUrls: ['./admin-hospital.component.css'],
})
export class AdminHospitalComponent {
  Hospital_DATA: HospitalUser[] = [];
  HospitalUserdataSource: MatTableDataSource<HospitalUser>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private serive: AdminUsersService) {
    // this.Hospital_DATA = Admi_Hospital_DATA;
    // this.HospitalUserdataSource = new MatTableDataSource(this.Hospital_DATA);
    this.HospitalUserdataSource = new MatTableDataSource(this.Hospital_DATA);
  }
  ngOnInit(): void {
    // var Get = localStorage.getItem('currentUser');
    // if (typeof Get === 'string') {
    //   var id = JSON.parse(Get).id;
    //   alert(id);
    // }
    this.serive.GetAdminHospitalUsers().subscribe((res) => {
      this.Hospital_DATA.push(...res);
      this.HospitalUserdataSource._updateChangeSubscription();
    });
  }

  //'id',
  displayedthreeColumns: string[] = [
    'firstName',
    'role',
    'specialization',
    'email',
    'contact',
    'isActive',
    'Disable',
  ];

  HospitalapplyFilter(event: Event) {
    // alert(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.HospitalUserdataSource.filter = filterValue.trim().toLowerCase();

    if (this.HospitalUserdataSource.paginator) {
      this.HospitalUserdataSource.paginator.firstPage();
    }
  }

  updateActiveStatus(element: any) {
    console.log(element);
    //alert('Original:' + element.isActive);
    var change = (element.activate = !element.activate);
    //alert('Changes1:' + change);
    //alert('Changes2:' + !element.isActive);
    // alert(element.id);
    var Id = element.id;
    this.serive.AdminLockHospitalUsers(Id);
  }

  ngAfterViewInit(): void {
    //Patient
    this.HospitalUserdataSource.paginator = this.paginator;
    this.HospitalUserdataSource.sort = this.sort;
    throw new Error('Method not implemented.');
  }
}
