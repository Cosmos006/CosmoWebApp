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
import { AuthenticationService } from 'src/app/Services';
import { User } from 'src/app/models/User';

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
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  appointmentPastHeaderData: AppointmentPastHeaderData[] =
    appointmentPastHeaderData;

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
      dataName: (row: { appointmentDateTime: Date }) =>
        `${new Date(row.appointmentDateTime).toLocaleDateString('en-US')}`,
    },
    {
      columnDef: 'diagnosis',
      isvisible: true,
      header: 'Diagnosis Name',
      dataName: (row: { diagnosis: any }) => `${row.diagnosis}`,
    },
    {
      columnDef: 'appointmentStatus',
      isvisible: true,
      header: 'AppointmentStatus',
      dataName: (row: { appointmentStatus: any }) => `${row.appointmentStatus}`,
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
      columnDef: 'cancelBtn',
      header: 'Cancel',
      type: 'button',
      icon: 'cancel',
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
  showCancelModal!: boolean;
  showCancelModalNew!: boolean;
  showSubmitModal!: boolean;
  addReason!: string;
  addReasonform:FormGroup=new FormGroup(
    {
      textReason:new FormControl(null,[Validators.required]),
  });
  selectedRow: any;
  userRole: any;
  appointments: Appointment[] = [
    { value: '1', viewValue: 'Upcoming Appointments' },
    { value: '2', viewValue: 'Past Appointments' },
    { value: '3', viewValue: 'Decline Appointments' },
  ];

  griddata: AppointmentData[] = [];
  currentUser: User;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,
    private patientDashboardService: PatientDashboardService,
    private authenticationService: AuthenticationService,
  ) {

    this.currentUser = this.authenticationService.currentUserValue;

  }

  ngOnInit(): void {
    this.showcolumns = this.allcolumns;
    this.patientDashboardService
      .GetAllAppointmentList()
      .subscribe((x: AppointmentData[]) => {
        this.griddata = x.filter(
          (v) => new Date(v.appointmentDateTime) > new Date()
        );
        this.filterAppointments('1');
      });
  }

  filterAppointments(val: any, pagination: any = {}) {
    if (val == '1') {
      this.patientDashboardService
        .GetAllUpcomingAppointmentList()
        .subscribe((x: AppointmentData[]) => {
          this.showcolumns = this.allcolumns.filter(
            (e) =>
              e.columnDef != 'prescriptionBtn' &&
              e.columnDef != 'viewdetailBtn' &&
              e.columnDef != 'reasonBtn'
          );
          this.griddata = x.filter(
            (v) =>
              new Date(v.appointmentDateTime) > new Date() &&
              v.appointmentStatus != 'Rejected'
          );
          this.processPaginationAndFilter(pagination);
        });
    } else if (val == '2') {
      this.patientDashboardService
        .GetPastAppointmentList()
        .subscribe((x: AppointmentData[]) => {
          this.griddata = x.filter(
            (v) => new Date(v.appointmentDateTime) < new Date()
          );
          this.showcolumns = this.allcolumns.filter(
            (e) =>
              e.columnDef != 'modifyBtn' &&
              e.columnDef != 'reasonBtn' &&
              e.columnDef != 'cancelBtn'
          );
          this.processPaginationAndFilter(pagination);
        });
    } else {
      this.patientDashboardService
        .GetDeclineAppointmentsList()

        .subscribe((x: AppointmentData[]) => {
          if (val == '3') {
            this.griddata = x.filter((v) => v.appointmentStatus == 'Rejected');
            this.showcolumns = this.allcolumns.filter(
              (e) =>
                e.columnDef != 'prescriptionBtn' &&
                e.columnDef != 'modifyBtn' &&
                e.columnDef != 'viewdetailBtn' &&
                e.columnDef != 'cancelBtn'
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
      this.griddata = this.griddata.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize
      );
    }
    if (this.searchText) {
      this.griddata = this.griddata.filter(
        (v) =>
          v.doctorName.includes(this.searchText) ||
          v.nurseName.includes(this.searchText)
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
    this.currentUser.role
  }
  ShowPrescriptionModel() {
    this.showPrescriptionModal = true;
  }
  ModifyModel() {
    // this.router.navigate(['/PatientBookappointment']);
  }
  hide() {
    this.showDeclineModal = false;
  }

  CancelModel() {
    this.showCancelModal = true;
  }
  hidetool() {
    if (this.showCancelModal) {
      this.showCancelModal = false;
    } else if (this.showSubmitModal) {
      this.showSubmitModal = false;
      this.router.navigate([PatientDashboardComponent]);
    } else {
      this.showCancelModalNew = false;
    }
  }
  canceltool() {
    if (this.showCancelModal) {
      this.showCancelModal = false;
      this.showCancelModalNew = true;
    } else if (this.showSubmitModal) {
      this.showSubmitModal = false;
    } else {
      if(this.addReasonform.invalid){
        alert('Please text some reason...');
      }
      else{
        this.showCancelModalNew = false;
        let apointdata = this.patientDashboardService
          .CancelAppointmentById(this.selectedRow.guid, 'Rejected',this.addReason )
          .subscribe((v) => {
            console.log(v.id, v.appointmentStatus);
          });
        this.showSubmitModal = true;
      }
    }
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
      // this.ModifyModel();
      var id = obj.guid;
      let apointdata = this.patientDashboardService
        .GetAppointmentById(obj.guid)
        .subscribe((v) => {
          this.router.navigate(['PatientBookAppointment/Patient'], {
            queryParams: { appointmentId: v.id },
          });
        });
    }
    if (obj.columnDef == 'cancelBtn') {
      var id = obj.guid;
      this.selectedRow = obj;
      this.CancelModel();
    }
    if (obj.columnDef == 'prescriptionBtn') {
      this.ShowPrescriptionModel();
    }
    if (obj.columnDef == 'viewdetailBtn') {
      // this.router.navigate(['/PatientViewdetails']);
      // var id = obj.guid;
      // let apointdata = this.patientDashboardService
      //   .GetAppointmentById(obj.guid)
      //   .subscribe((v) => {
      //     //var data = v.find((e) => e.id == obj.guid)!;
      //     this.ShowViewdetailModel(v);
      //   });
    }
    if (obj.columnDef == 'reasonBtn') {
      var id = obj.guid;
      let apointdata = this.patientDashboardService
        .GetAppointmentById(obj.guid)
        .subscribe((v) => {
          //var data = v.find((e) => e.id == obj.guid)!;
          this.ShowDeclineInfo(v);
        });
    }
  }

  demographicBtn() {
    this.router.navigate(['/PatientDetails']);
  }

  DashboardRedirectURL(navigate: any) {
    if (navigate == 'locked') {
      this.router.navigateByUrl('/LockedAccount');
    } else if (navigate == 'Covid') {
      //this.router.navigateByUrl('/AdminPatient');
      this.router.navigate(['PatientBookAppointment/Covid']);
    }
  }
}
