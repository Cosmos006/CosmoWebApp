import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientDashboardService } from 'src/app/Services/patientdashboard.service';

import {
  //appointmentData,
  AppointmentData,
  appointments,
  Appointment,
  appointmentPastHeaderData,
  AppointmentPastHeaderData,
  appointmentHeaderData,
  AppointmentHeaderData,
} from 'src/app/models/patientDashboard';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PatientDashboardComponent implements OnInit {
  PatientLink(Type: string) {
    if (Type == 'Covid') {
      this.router.navigate(['PatientBookAppointment/Covid']);
    } else if (Type == 'Appointment') {
      this.router.navigate(['PatientBookAppointment/Patient'], {
        queryParams: { appointmentId: '209B85F4-77A1-45AA-5244-08D9D85C96B7' },
      });
    }
  }

  //appointmentData: AppointmentData[];
  appointmentPastHeaderData: AppointmentPastHeaderData[] =
    appointmentPastHeaderData;

  //dataSource = new MatTableDataSource(appointmentData);
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort, {}) sort!: MatSort;

  //fakeData = appointmentData;
  //pastResults = appointmentPastHeaderData;

  //value?: string = 'abcd';
  allcolumns: any[] = [
    {
      columnDef: 'doctorName',
      isvisible: true,
      header: 'Doctor Name',
      dataName: (row: { doctorName: any }) => `${row.doctorName}`,
    },
    {
      columnDef: 'appointmentDateTime',
      isvisible: true,
      header: 'Appointment Date',
      dataName: (row: { appointmentDateTime: Date }) => `${new Date(row.appointmentDateTime).toLocaleDateString('en-US')}`,
    },
    {
      columnDef: 'diagnosis',
      isvisible: true,
      header: 'Diagnosis Name',
      dataName: (row: { diagnosis: any }) => `${row.diagnosis}`,
    },
    {
      columnDef: 'modifyBtn',
      header: 'Modify',
      type: 'button',
      icon: 'edit',
      isvisible: true,
      dataName: (row: { id: any }) => `${row.id}`,
    },
    {
      columnDef: 'viewdetailBtn',
      header: 'View details',
      isvisible: false,
      type: 'button',
      icon: 'visibility',
      dataName: (row: { id: any }) => `${row.id}`,
    },
    {
      columnDef: 'prescriptionBtn',
      header: 'prescription',
      type: 'button',
      icon: 'description',
      isvisible: false,
      dataName: (row: { id: any }) => `${row.id}`,
    },
    {
      columnDef: 'reasonBtn',
      header: 'reason',
      type: 'button',
      icon: 'contact_support',
      isvisible: false,
      dataName: (row: { id: any }) => `${row.id}`,
    },
  ];
  showcolumns!: any[];
  metaCount?: number;

  selectedValue: string = '1';
  showDeclineModal!: boolean;
  showPrescriptionModal!: boolean;
  showviewdetailModel!: boolean;
  selectedAppointment!: AppointmentData;
  searchText!: string;

  appointments: Appointment[] = [
    { value: '1', viewValue: 'Upcoming Appointments' },
    { value: '2', viewValue: 'Past Appointments' },
    { value: '3', viewValue: 'Decline Appointments' },
  ];

  griddata: AppointmentData[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,
    private patientDashboardService: PatientDashboardService
  ) { }

  ngOnInit(): void {
    this.showcolumns = this.allcolumns;
    this.patientDashboardService.GetAllAppointmentList()
      .subscribe((x: AppointmentData[]) => {
        this.griddata = x.filter((v) => new Date(v.appointmentDateTime) > new Date());
        this.filterAppointments('1');
      });
  }
  
  filterAppointments(val: any, pagination: any = {}) {

    if (val == '1') {
      this.patientDashboardService.GetAllUpcomingAppointmentList()
        .subscribe((x: AppointmentData[]) => {
          this.showcolumns = this.allcolumns.filter(
            (e) =>
              e.columnDef != 'prescriptionBtn' &&
              e.columnDef != 'viewdetailBtn' &&
              e.columnDef != 'reasonBtn'
          );
          this.griddata = x.filter((v) => new Date(v.appointmentDateTime) > new Date() && v.appointmentStatus != 'Rejected');
          this.processPaginationAndFilter(pagination);

        });
    }
    else if (val == '2') {
      this.patientDashboardService.GetPastAppointmentList()
        .subscribe((x: AppointmentData[]) => {

          this.griddata = x.filter((v) => new Date(v.appointmentDateTime) < new Date());
          this.showcolumns = this.allcolumns.filter(
            (e) => e.columnDef != 'modifyBtn' && e.columnDef != 'reasonBtn'
          );
          this.processPaginationAndFilter(pagination);

        });
        
    }
    else {
      this.patientDashboardService.GetDeclineAppointmentsList()
        .subscribe((x: AppointmentData[]) => {
       if (val == '3') {
        
            this.griddata = x.filter((v) => v.appointmentStatus == 'Rejected');
            this.showcolumns = this.allcolumns.filter(
              (e) =>
                e.columnDef != 'prescriptionBtn' &&
                e.columnDef != 'modifyBtn' &&
                e.columnDef != 'viewdetailBtn'
            );
          } else {
            this.griddata = x;
            this.showcolumns = this.allcolumns;
          }
          this.processPaginationAndFilter(pagination);
        });
    }
  }
  processPaginationAndFilter(pagination: any = {}) {
    if (pagination != null && pagination.pageIndex >= 0) {
      this.griddata = this.griddata.slice(pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize)
    }
    if (this.searchText){
      this.griddata = this.griddata.filter((v) =>
        v.doctorName.includes(this.searchText)
        || v.nurseName.includes(this.searchText)
      );
    }
  }
  searchAppointments(val: any) {
    this.searchText = val.target.value;
    this.filterAppointments(this.selectedValue);
  }

  ShowDeclineInfo(item: AppointmentData) {
    this.selectedAppointment = item;
    this.showDeclineModal = true;
  }
  ShowPrescriptionModel() {
    this.showPrescriptionModal = true;
  }
  ModifyModel() {
    // alert('hi..');
    this.router.navigate(['/PatientDetails']);
  }
  hide() {
    this.showDeclineModal = false;
  }
  hidePrescriptionModel() {
    this.showPrescriptionModal = false;
  }
  ShowViewdetailModel(item: AppointmentData) {
    this.selectedAppointment = item;
    this.showviewdetailModel = true;
  }
  hideViewdetailModel() {
    this.showviewdetailModel = false;
  }
  exporAll() {
    const header = Object.keys(this.griddata[0]);
    let ar: AppointmentData[] = this.griddata;
    let csv = ar.map((row) =>
      header
        .map((fieldName) => JSON.stringify((row as any)[fieldName]))
        .join(',')
    );
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, 'myFile.csv');
  }
  export(data: AppointmentData) {
    //data=this.griddata;
    const header = Object.keys(this.griddata[0]);
    let ar: AppointmentData[] = [data];
    let csv = ar.map((row) =>
      header
        .map((fieldName) => JSON.stringify((row as any)[fieldName]))
        .join(',')
    );
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, 'myFile.csv');
  }
  updatePagination(event: any) {
    this.filterAppointments(this.selectedValue, event);
  }

  viewItem(obj: any) {
    if (obj.columnDef == 'modifyBtn') {
      this.ModifyModel();
    }
    if (obj.columnDef == 'prescriptionBtn') {
      this.ShowPrescriptionModel();
    }
    if (obj.columnDef == 'viewdetailBtn') {
      var id = obj.guid;
      let apointdata = this.patientDashboardService.GetAppointmentById(obj.guid)
        .subscribe((v) => {
          //var data = v.find((e) => e.id == obj.guid)!;
          this.ShowViewdetailModel(v);
        });

    }
    if (obj.columnDef == 'reasonBtn') {
      
      var id = obj.guid;
      let apointdata = this.patientDashboardService.GetAppointmentById(obj.guid)
        .subscribe((v) => {
          //var data = v.find((e) => e.id == obj.guid)!;
          this.ShowDeclineInfo(v);
        });
    }
  }

  demographicBtn(){
    this.router.navigate(['/PatientDetails']);
  }

  DashboardRedirectURL(navigate: any) {
    if (navigate == 'locked') {
      this.router.navigateByUrl('/LockedAccount');
    } else if (navigate == 'patient') {
      this.router.navigateByUrl('/AdminPatient');
    }
  }
}
