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


interface Appointment { 
  value: string;
  viewValue: string;
}

interface AppointmentData {
  id: number;
  doctorName: string;
  date: Date;
  nurseName: string;
  isDeclined: boolean;
  diagnosis:string;
}

interface AppointmentPastHeaderData {
  // id: number;
  doctorName: string;
  date: string;
  nurseName: string;
  diagnosis:string;
  // isDeclined: boolean;
}
interface AppointmentHeaderData {
  doctorName: string;
  date: string;
  nurseName: string;
  diagnosis: string;
}

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PatientDashboardComponent implements OnInit {
  selectedValue: string = "1";
  showDeclineModal!: boolean;
  showPrescriptionModal!:boolean;
  showviewdetailModel!:boolean;
  selectedAppointment!: AppointmentData;
  searchText!: string;
  appointments: Appointment[] = [
    { value: '1', viewValue: 'Upcoming Appointments' },
    { value: '2', viewValue: 'Past Appointments' },
    { value: '3', viewValue: 'Decline Appointments' }
  ];

  appointmentPastHeaderData: AppointmentPastHeaderData[] = [
    {
      doctorName: 'Doctor Name',
      date: 'Appointment Date',
      nurseName: 'Nurse Name',
      diagnosis: 'Diagnosis'
    }
  ];

  appointmentHeaderData: AppointmentHeaderData[] = [
    {
      doctorName: 'Doctor Name',
      date: 'Appointment Date',
      nurseName: 'Nurse Name',
      diagnosis: 'Diagnosis'
    }
  ];

  gridheader: AppointmentPastHeaderData[] = [];
  gridheader1: AppointmentHeaderData[] = [];

  appointmentData: AppointmentData[] = [
    {
      id: 1,
      doctorName: 'Dr. 1',
      date: new Date('02/26/2021 10:00'),
      nurseName: 'Nurse 1',
      isDeclined: false,
      diagnosis:'Chest pain'
    },
    {
      id: 2,
      doctorName: 'Dr. 2',
      date: new Date('2/27/2021'),
      nurseName: 'Nurse 2',
      isDeclined: false,
      diagnosis:'Headache'
    },
    {
      id: 3,
      doctorName: 'Dr. 3',
      date: new Date('2/28/2021'),
      nurseName: 'Nurse 3',
      isDeclined: false,
      diagnosis:'Fever'
    },
    {
      id: 4,
      doctorName: 'Dr. 4',
      date: new Date('2/28/2021'),
      nurseName: 'Nurse 4',
      isDeclined: false,
      diagnosis:'Pneumonia'
    },
    {
      id: 5,
      doctorName: 'Dr. 5',
      date: new Date('1/03/2022'),
      nurseName: 'Nurse 5',
      isDeclined: false,
      diagnosis:'Hypertension'
    },
    {
      id: 6,
      doctorName: 'Dr. 6',
      date: new Date('2/02/2021'),
      nurseName: 'Nurse 6',
      isDeclined: true,
      diagnosis:'Stroke'
    },
    {
      id: 7,
      doctorName: 'Dr. 7',
      date: new Date('6/02/2021'),
      nurseName: 'Nurse 7',
      isDeclined: true,
      diagnosis:'The takeaway'
    },
    {
      id: 8,
      doctorName: 'Dr. 8',
      date: new Date('2/12/2021'),
      nurseName: 'Nurse 8',
      isDeclined: false,
      diagnosis:'Fever'
    },
  ];
  griddata: AppointmentData[] = [];

  constructor( private router:Router,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.griddata = this.appointmentData.filter((v) => v.date > new Date());
    this.gridheader = this.appointmentPastHeaderData;
    this.gridheader1 = this.appointmentHeaderData;
  }
  filterAppointments(val: any) {
    if (val == '1') {
      this.gridheader1 = this.appointmentHeaderData;
      this.griddata = this.appointmentData.filter((v) => v.date > new Date());
    } else if (val == '2') {
      this.gridheader = this.appointmentPastHeaderData;
      this.griddata = this.appointmentData.filter((v) => v.date < new Date());
    } else if (val == '3') {
      this.gridheader1 = this.appointmentHeaderData;
      this.griddata = this.appointmentData.filter((v) => v.isDeclined == true);
    } else {
      this.griddata = this.appointmentData;
    }
    if(this.searchText)
    this.griddata = this.griddata.filter((v) =>  v.doctorName.includes(this.searchText));
    
  }
  ModifyAppointment(){
    this.router.navigateByUrl('/PatientBookappointment');
  }
  ShowDeclineInfo(){
    this.showDeclineModal = true;  
  }
  ShowPrescriptionModel(){
    this.showPrescriptionModal = true;
  }
  hide() {
    this.showDeclineModal = false;
  }
  hidePrescriptionModel(){
    this.showPrescriptionModal = false;

  }
  ShowViewdetailModel(item: AppointmentData){
    this.selectedAppointment = item;
    this.showviewdetailModel = true;
  }
  hideViewdetailModel() {
    this.showviewdetailModel = false;
  }
  export(data: AppointmentData) {
    //data=this.griddata;
    const header = Object.keys(this.griddata[0]);
    let ar : AppointmentData[] = [data]
    let csv = ar.map(row => header.map(fieldName => JSON.stringify((row as any)[fieldName])).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }
}