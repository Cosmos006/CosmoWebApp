import { Component, OnInit, ViewChild } from '@angular/core';
//Book Appointment
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { GenerateTimeSlot } from 'src/app/models/Globalfunctions';
import { PatientService } from 'src/app/Services/patient.service';
//Model Imports
import { Booking, Diagnosics, Physician } from '../../../models/patient.model';
//Router
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Services/Url';
import { BookAppointmentService } from 'src/app/Services/BookAppointment/book-appointment.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  UserType: string = '';
  form!: FormGroup;
  selected: Date | undefined;
  firstslot!: Array<string>;
  secondslot!: Array<string>;
  incomingslot: Array<string> = [];
  outgoingslot!: Array<string>;
  diagnosics: Diagnosics[] = [];
  physician: Physician[] = [];
  TextInput?: string;
  //Form
  isSubmitted = false;
  diagnosicsName: string = '';
  phsicianName: any;
  slot?: string;
  slotName: any;
  calendardata: any;
  descriptionName: any;

  //SelectedDate
  selectedDate: any;
  datecheck = false;

  //Slot
  slotcheck = false;
  diagnosicscheck = false;

  //Result
  Result: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //Date
  minDate: any;
  maxDate: any;

  constructor(
    private patientservice: PatientService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: BookAppointmentService,
    private _snackBar: MatSnackBar
  ) {
    var CurrentDate = new Date();
    this.minDate = CurrentDate;
    var FutureDate = new Date();
    this.maxDate = new Date(FutureDate.setMonth(CurrentDate.getMonth() + 1));
    // console.log(this.maxDate);
  }

  //Bind Data
  bookinglist: Booking[] = [];

  registrationForm = this.fb.group({
    diagnosicsName: ['', [Validators.required]],
    phsicianName: ['', [Validators.required]],
    descriptionName: ['', [Validators.required]],
    calendardata: ['', Validators.required],
    slotName: ['', [Validators.required]],
  });

  @ViewChild('matExpansionPanel', { static: true })
  matExpansionPanelElement!: MatExpansionPanel;

  ngOnInit() {
    //Text input Bind
    this.route.paramMap.subscribe((res) => {
      this.UserType += res.get('Type');
    });

    this.TextInput = 'Book Appointment';

    //Bind DropDownn
    // this.diagnosics = [
    //   { id: '1', value: 'Cold' },
    //   { id: '2', value: 'Feaver' },
    //   { id: '3', value: 'Thyroid' },
    // ];

    this.physician = [
      { Id: 1, PhysicianName: 'Raj' },
      { Id: 2, PhysicianName: 'Ram' },
      { Id: 3, PhysicianName: 'Anand' },
    ];

    //Mat expansion close
    this.matExpansionPanelElement.close();

    var data = 1;
    switch (this.UserType) {
      case 'Patient':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Nurse':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Physician':
        this.GlobalBookAppointment(this.UserType);
        break;
      case 'Admin':
        this.GlobalBookAppointment(this.UserType);
        break;
      default:
        alert('No such day exists!');
        break;
    }
  }

  GlobalBookAppointment(UserType: string) {
    if (UserType == 'Patient') {
      this.TextInput = 'Book Appointment';
      this.service.GetDiagnosics().subscribe((res) => {
        // alert(res);
        this.diagnosics.push(...res);
      });
      this.physician = [
        { Id: 1, PhysicianName: 'Raj' },
        { Id: 2, PhysicianName: 'Ram' },
        { Id: 3, PhysicianName: 'Anand' },
      ];
    } else if (UserType == 'Nusre') {
    } else if (UserType == 'Physician') {
    } else if (UserType == 'Admin') {
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  updateFormDate(e: any) {
    if (e != null) {
      this.registrationForm.patchValue({
        calendardata: e,
      });

      var date = new Date(e);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var full =
        date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
      this.selectedDate = full;
      this.datecheck = false;
    } else {
      this.datecheck = true;
    }
  }

  changeDiagnosics(e: any) {
    if (e.value != null) {
      // this.diagnosicsName.setValue(e.value, {
      //   onlySelf: true,
      // });

      // this.diagnosicsName = this.registrationForm
      //   .get('diagnosicsName')
      //   ?.patchValue(e.value);

      this.diagnosicsName =
        this.registrationForm.get('diagnosicsName')?.setValue(e.value) || '';

      this.diagnosicscheck = false;

      //alert(this.diagnosicsName);

      //alert(this.registrationForm.get('diagnosicsName')?.value);
    }
  }

  changePhysician(e: any): boolean {
    var diagnosics = this.registrationForm.get('diagnosicsName')?.value;
    var date = this.registrationForm.get('calendardata')?.value;

    if (e.value == undefined || diagnosics === '' || date === '') {
      this.matExpansionPanelElement.close();
      this.diagnosicscheck = true;
      this.datecheck = true;
      return false;
    } else if (e.value != null && diagnosics != '' && date != '') {
      this.diagnosicscheck = false;
      this.datecheck = false;
      this.matExpansionPanelElement.open();
      const start = new Date('2019-08-08 09:00');
      const end = new Date('2019-08-08 20:00');
      const timespan = 30 * 60; // 30 minutes
      const siestas = [
        {
          start: '2019-08-08 8:00',
          end: '2019-08-08  8:30',
        },
      ];

      let [firstslot, secondslot] = GenerateTimeSlot(
        start,
        end,
        timespan,
        siestas
      );
      this.firstslot = firstslot;
      this.secondslot = secondslot;
      this.service
        .GetBookSlot(
          '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
          date._i.year + '-' + date._i.month + 1 + '-' + date._i.date
        )
        .subscribe((res) => {
          for (var i = 0; i < res.length; i++) {
            this.incomingslot.push(res[i].bookslot);
          }
          const duplicate = this.incomingslot;
          let unique = [...new Set(duplicate)];
          this.firstslot = firstslot.filter((val) => !unique.includes(val));
          this.secondslot = secondslot.filter((val) => !unique.includes(val));
        });

      // this.incomingslot = [
      //   '09 to09:30 ',
      //   '09:30 to10:00 ',
      //   '10 to10:30 ',
      //   '12 to12:30 ',
      // ];
    }

    return true;
  }

  Slot(e: any) {
    const slotvalue = String(e._elementRef.nativeElement.id);
    if (slotvalue != null) {
      this.diagnosicscheck = false;
      this.registrationForm.patchValue({
        slotName: slotvalue,
      });
    }
  }

  expClick() {
    const physician = this.registrationForm.value['phsicianName'];
    if (physician === '' || physician === undefined) {
      this.matExpansionPanelElement.close();
      this.slotcheck = true;
    } else {
      this.matExpansionPanelElement.open();
      this.slotcheck = false;
      this.diagnosicscheck = false;
    }
  }

  onSubmit(): boolean {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      //Diagnosics
      this.diagnosicscheck = false;
      //alert(JSON.stringify(this.registrationForm.value));
      //var data = JSON.stringify(this.registrationForm.value);
      var data = this.registrationForm.value;

      //Date Time Logic
      var myDate = new Date(data.calendardata);

      //Time Split
      var time = data.slotName.split('to');

      //Split time
      var hour = time[0].split(':');

      // Set hours
      myDate.setHours(hour[0]);
      // Then set minutes

      //myDate.setMinutes(hour[1]);
      // Then set seconds

      //myDate.setSeconds(0);

      var bookingdata: Booking = {
        appointmentType: this.TextInput,
        diagnosis: data.diagnosicsName,
        appointmentStatus: 'pending',
        isCompleted: false,
        bookslot: data.slotName,
        appointmentDateTime: myDate,
        patientId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        physicianId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        nurseId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      };
      this.service
        .BookAppointmentPost(bookingdata)
        .then((response) => response.text())
        .then((result) => {
          this.Result += result;
          if (this.Result == 'Success') {
            this.registrationForm.reset();
            this.registrationForm.controls['diagnosicsName'].setErrors(null);
            this.registrationForm.controls['phsicianName'].setErrors(null);
            this.registrationForm.controls['descriptionName'].setErrors(null);
            this.registrationForm.controls['calendardata'].setErrors(null);
            this.registrationForm.controls['slotName'].setErrors(null);
            this.matExpansionPanelElement.close();

            const snackBarRef = this._snackBar.open(
              'Appointment Created',
              'Done',
              {
                panelClass: 'success',
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000,
              }
            );

            snackBarRef.afterDismissed().subscribe((info) => {
              if (info.dismissedByAction === true) {
                // your code for handling this goes here
                this.router.navigate(['/Calender']);
              }
            });

            //this.router.navigate(['/Calender']);
          }
        })
        .catch((error) => console.log('error', error));
      //this.router.navigate(['/AdminCalender']);
      return true;
    } else {
      var date = this.registrationForm.value['calendardata'];
      var slot = this.registrationForm.value['slotName'];
      this.diagnosicscheck = true;
      if (date === '' || date === null) {
        this.datecheck = true;
      }
      if (slot === '' || date === null) {
        this.slotcheck = true;
      }
      return false;
    }
  }

  Clear() {
    this.registrationForm.reset();
    this.registrationForm.controls['diagnosicsName'].setErrors(null);
    this.registrationForm.controls['phsicianName'].setErrors(null);
    this.registrationForm.controls['descriptionName'].setErrors(null);
    this.registrationForm.controls['calendardata'].setErrors(null);
    this.registrationForm.controls['slotName'].setErrors(null);
    this.matExpansionPanelElement.close();
  }
}
