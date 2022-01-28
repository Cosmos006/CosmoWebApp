import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Guid } from 'guid-typescript';
import { InboxService } from 'src/app/Services/Inbox/inbox.service';
import { UserDetails } from 'src/app/models/userdetails';

export interface Appointments { 
  appointmentId : Guid
  meetingTitle: string;
  //description: string;
  physicianName: string;
  appointmentDateTime: Date;
  //editHistory: boolean;
  patientName: string;
  // PhysicianId: Guid;
  // NurseId: Guid;
  //AppointmentType : string
  diagnosis : string
}

export interface ReceivedNotes {
  id: string;
  senderName: string;
  designation: string;
  message: string;
  //urgency:boolean;
  reply: boolean;
  date: Date;
}

export interface SendNotes {
  id: Guid;
  Message: string;
  Designation: string;
  NotesDateTime: Date;
  SenderEmployeeId: Guid;
  RecieverEmployeeId: Guid;
}

export interface Notes {
  id: Guid;
  message: string;
  designation: string;
  notesDateTime: Date;
  senderName: string;
  recieverName: string;
  isSentOrRecieved: string;
}

export interface SentNotes {
  senderName: string;
  designation: string;
  message: string;
  date: Date;
}
const ELEMENT_DATA: Appointments[] = []
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date('06-10-2021 3:30'),
//     editHistory: true,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date(),
//     editHistory: true,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date(),
//     editHistory: false,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date('12-10-2021 3:30'),
//     editHistory: true,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date(),
//     editHistory: false,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date('12-17-2021 3:30'),
//     editHistory: true,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date('12-05-2021 3:30'),
//     editHistory: true,
//   },
//   {
//     meetingTitle: 'Regular check up',
//     description: 'doses verification',
//     physician: 'Dr,John Doe',
//     date: new Date('12-05-2021 3:30'),
//     editHistory: true,
//   },
// ];

export interface User {
  Id: Guid;
  name: string;
  designation: string;
  UserId: Guid;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InboxComponent implements OnInit, AfterViewInit {
  
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'John',
  //     designation: 'Senior Doctor  & Specialist',
  //     //isSent: false,
  //     message: 'High doses of this medicine can cause side effects',
  //     notesDateTime: new Date('12-10-2021 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Sam',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: false,
  //     notesDateTime: new Date('12-10-2020 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Katy',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: false,
  //     notesDateTime: new Date('12-06-2021 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Alex',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: false,
  //     notesDateTime: new Date('12-15-2021 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Dolph',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: false,
  //     notesDateTime: new Date(),
  //   },
  // ];
  //declare a class member in component
  //displayedColumns1: string[] = ['Date and Time', 'Sender Name', 'Designation', 'Message','Reply','Delete'];
  ELEMENT_DATA1: Notes[] = []
  displayedColumns1: string[] = [
    'Sender Name',
    'Designation',
    'Message',
    'Date and Time',
    'Action',
  ];
  RecieveddataSource = new MatTableDataSource<Notes>(this.ELEMENT_DATA1);
  @ViewChild('paginator1') paginator1!: MatPaginator;

  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'John',
  //     designation: 'Senior Doctor  & Specialist',
  //     //isSent: true,
  //     message: 'High doses of this medicine can cause side effects',
  //     notesDateTime: new Date('12-10-2021 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Sam',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: true,
  //     notesDateTime: new Date('12-10-2020 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Katy',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: true,
  //     notesDateTime: new Date('12-06-2021 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Alex',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: true,
  //     notesDateTime: new Date('12-15-2021 3:30'),
  //   },
  //   {
  //     id: Guid.createEmpty(),
  //     employeeName: 'Dolph',
  //     designation: 'Senior Dr',
  //     message: 'my message',
  //     //isSent: true,
  //     notesDateTime: new Date(),
  //   },
  // ];
  //declare a class member in component
  //displayedColumns1: string[] = ['Date and Time', 'Sender Name', 'Designation', 'Message','Reply','Delete'];
  
  ELEMENT_DATA2: Notes[] = []
  displayedColumns2: string[] = [
    'Reciever Name',
    'Designation',
    'Message',
    'Date and Time',
    'Delete',
  ];
  SentdataSource = new MatTableDataSource<Notes>(this.ELEMENT_DATA2);
  @ViewChild('paginator2') paginator2!: MatPaginator;

  //temp:ReceivedNotes={senderName:'',designation:'',message:'',reply:false,date:new Date()}
  //;
 
  replyicon: string = '<mat-icon >replay</mat-icon>';
  repliedicon: string = '<mat-icon >done</mat-icon>';

  displayedColumns: string[] = [
    'Meeting Title',
    'Diagnosis',
    'Patient',
    'Date',
    'Time',
    'Visit Details',
  ];
  dataSource = new MatTableDataSource<Appointments>(ELEMENT_DATA);
  showButton: boolean = false;
  newReceivedMsg: number = 10;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  control = new FormControl();
  form!: FormGroup;
  public now: Date = new Date();
  filteredOptions!: Observable<User[]>;
  designation: string | undefined = '';
  users: User[] = [];
  error!: string;
  currentEmployee: any;
  //userdetail!: UserDetails;
  todayDate! : Date
  currentnotes!: Notes

  constructor(private fb: FormBuilder, private inboxService: InboxService) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
    this.todayDate= new Date();
  }

  ngOnInit(): void {
    var getuser = localStorage.getItem('user');
    if (typeof getuser === 'string') {
      var id = JSON.parse(getuser).id;
    
    }

    this.inboxService.GetAppointmentByEmployeeId(id).subscribe({
      next:(res: any)=>{
        this.dataSource.data = res;
        this.dataSource._updateChangeSubscription();
        console.log(this.dataSource.data)
      },
      error: (e: any) => console.error(e)
      
    });

    this.inboxService.GetEmployee().subscribe({
      next: (res: any) => {
        console.log(res);
        for(var i=0;i<res.length;i++)
        {
           this.users.push({ 
            Id: res[i].id,
            name: res[i].firstName +' '+res[i].lastName,         
            designation: res[i].designation,       
            UserId: res[i].userId,        
            });
        }
        //this.users.push();
       
          //alert(id);
          this.currentEmployee = this.users.filter((x) => x.UserId == id);
          console.log(this.currentEmployee)
          this.GetNotes(this.currentEmployee[0].Id)
          var index = this.users.indexOf(this.currentEmployee[0])
          this.users.splice(index,1)
          console.log(this.users)

          this.filteredOptions = this.control.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value))
          );
        //}
      },
      error: (e: any) => console.error(e),
    });

    

    //ELEMENT_DATA.sort((x, y) => +new Date(x.date) - +new Date(y.date));

    this.form = this.fb.group({
      receiver: ['', Validators.required],
      designation: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  private _filter(value: string): User[] {
    console.log('hi');
    const filterValue = value.toLowerCase();
    return this.users.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  private GetNotes(loggedInUserId : Guid){
    console.log(loggedInUserId)
     this.inboxService.GetNotesById(loggedInUserId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.SentdataSource.data = res.filter((x :Notes) => x.isSentOrRecieved === 'SENT')
        this.RecieveddataSource.data = res.filter((x :Notes) => x.isSentOrRecieved === 'RECIEVED')
        this.SentdataSource._updateChangeSubscription()
        this.RecieveddataSource._updateChangeSubscription()
        console.log(this.SentdataSource.data)
        console.log(this.RecieveddataSource.data)
      },
      error: (e: any) => console.error(e),
       
     })
  }

  OnClickName(designation: string) {
    this.form.get('designation')?.patchValue(designation);
  }

  ngAfterViewInit() {
    this.SentdataSource.paginator = this.paginator2;
    this.RecieveddataSource.paginator = this.paginator1;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }

  getBackgroundColor(date: Date) {
    let color = 'orange';
    let today: Date = new Date();
    let futureDay: Date = new Date(date);
    if (this.isDatesEqual(today, futureDay)) {
      //console.log(today.getDate===futureDay.getDate);
      color = 'red';
    } else {
      color = '';
    }
    return color;
  }

  isDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  OnSend() {
    if (this.form.valid) {
      var filtereduser = this.users.find(
        (x) =>
          x.name == this.form.value.receiver &&
          x.designation == this.form.value.designation
      );
      if (filtereduser === undefined) {
        this.error = 'User does not exsist';
        return;
      }
      var date =new Date();
      //let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
      this.currentnotes = {
        id: Guid.createEmpty(),
        message: this.form.value.message,
        notesDateTime: this.todayDate,
        recieverName: filtereduser?.name,
        senderName: this.currentEmployee[0].name,
        designation: filtereduser?.designation,
        isSentOrRecieved : 'SENT'
      };
      this.SentdataSource.data.push(this.currentnotes)
      this.SentdataSource._updateChangeSubscription();

      var notes = {
        Message: this.form.value.message,
        Designation: this.form.value.designation,
        NotesDateTime: this.todayDate,
        SenderEmployeeId: this.currentEmployee[0].Id,
        RecieverEmployeeId: filtereduser?.Id,
        //isSent: true,
      };

      console.log(notes);

      this.inboxService.SendNotes(notes);
      this.form.reset()
    }
  }
  onDelete(tabName: string, j: Notes) {
    console.log('Hii' + tabName);
    if (tabName == 'RECIEVED') {
      const index = this.RecieveddataSource.data.indexOf(j);
      this.RecieveddataSource.data.splice(index, 1);
      this.RecieveddataSource._updateChangeSubscription();
    } else if (tabName == 'SENT') {
      const index = this.SentdataSource.data.indexOf(j);
      this.SentdataSource.data.splice(index, 1);
      this.SentdataSource._updateChangeSubscription();
    }

    this.inboxService.DeleteEmployee(j.id);
  }

  OnReply(tabName: string, obj: ReceivedNotes) {
    for (
      let i = 0;
      i < document.querySelectorAll('.mat-tab-label-content').length;
      i++
    ) {
      if (
        (<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i])
          .innerText == tabName
      ) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
    this.form.controls?.['receiver'].patchValue(obj.senderName);
    this.form.controls?.['designation'].patchValue(obj.designation);

    //this.form.get('receiver').patchValue()
  }
}
