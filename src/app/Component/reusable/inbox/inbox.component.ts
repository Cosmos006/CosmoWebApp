import { AfterViewInit, Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Guid } from 'guid-typescript';
import { InboxService } from 'src/app/Services/Inbox/inbox.service';
import { UserDetails } from 'src/app/models/userdetails';

export interface Appointments
{
  meetingTitle:string;
  description:string;
  physician:string;
  date:Date;
  
  editHistory:boolean;
  patientId?:BigInteger;
}

export interface ReceivedNotes
{
  id:string
  senderName:string;
  designation:string;
  message:string;
  //urgency:boolean;
  reply:boolean
  date:Date
  
}

export interface SendNotes
{
  id:Guid
  Message : string
  NotesDateTime : Date
  SenderEmployeeId : Guid
  RecieverEmployeeId :Guid
}

export interface Notes
{
  id:Guid
  message : string
  designation : string
  notesDateTime : Date
  employeeName : string
}


export interface SentNotes
{
  senderName:string;
  designation:string;
  message:string;
  date:Date
  
}
const ELEMENT_DATA:Appointments[]=
[
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date('06-10-2021 3:30'),editHistory:true},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date,editHistory:true},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date,editHistory:false},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date('12-10-2021 3:30'),editHistory:true},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date,editHistory:false},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date('12-17-2021 3:30'),editHistory:true},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date('12-05-2021 3:30'),editHistory:true},
  {meetingTitle:"Regular check up",description:"doses verification",physician:"Dr,John Doe",date:new Date('12-05-2021 3:30'),editHistory:true},
  
]

export interface User {
    Id : Guid
    name:string,
    designation:string
    UserId : Guid
   
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit,AfterViewInit {

  ELEMENT_DATA1:Notes[]=
  [
    {id: Guid.createEmpty(),employeeName:'John',designation:'Senior Doctor  & Specialist',message:'High doses of this medicine can cause side effects',notesDateTime:new Date('12-10-2021 3:30')},
    {id: Guid.createEmpty(),employeeName:'Sam',designation:'Senior Dr',message:'my message',notesDateTime:new Date('12-10-2020 3:30')},
    {id: Guid.createEmpty(),employeeName:'Katy',designation:'Senior Dr',message:'my message',notesDateTime:new Date('12-06-2021 3:30')},
    {id: Guid.createEmpty(),employeeName:'Alex',designation:'Senior Dr',message:'my message',notesDateTime:new Date('12-15-2021 3:30')},
    {id: Guid.createEmpty(),employeeName:'Dolph',designation:'Senior Dr',message:'my message',notesDateTime:new Date()}
    
  
  ]
    //declare a class member in component 
    //displayedColumns1: string[] = ['Date and Time', 'Sender Name', 'Designation', 'Message','Reply','Delete'];   
    displayedColumns1: string[] = ['Sender Name', 'Designation', 'Message','Reply','Date and Time','Delete'];   
    RecieveddataSource = new MatTableDataSource<Notes>(this.ELEMENT_DATA1);
  
  
    ELEMENT_DATA2:Notes[]=
  [
    {id: Guid.createEmpty(),employeeName:'John',designation:'Senior Doctor  & Specialist',message:'High doses of this medicine can cause side effects',notesDateTime:new Date('12-10-2021 3:30')},
    {id: Guid.createEmpty(),employeeName:'Sam',designation:'Senior Dr',message:'my message',notesDateTime:new Date('12-10-2020 3:30')},
    {id: Guid.createEmpty(),employeeName:'Katy',designation:'Senior Dr',message:'my message',notesDateTime:new Date('12-06-2021 3:30')},
    {id: Guid.createEmpty(),employeeName:'Alex',designation:'Senior Dr',message:'my message',notesDateTime:new Date('12-15-2021 3:30')},
    {id: Guid.createEmpty(),employeeName:'Dolph',designation:'Senior Dr',message:'my message',notesDateTime:new Date()}
    
  
  ]
    //declare a class member in component 
    //displayedColumns1: string[] = ['Date and Time', 'Sender Name', 'Designation', 'Message','Reply','Delete'];   
    displayedColumns2: string[] = ['Sender Name', 'Designation', 'Message','Date and Time','Delete'];   
    SentdataSource = new MatTableDataSource<Notes>(this.ELEMENT_DATA2);
    @ViewChild('paginator2') paginator2!: MatPaginator;
  
  
    //temp:ReceivedNotes={senderName:'',designation:'',message:'',reply:false,date:new Date()}
    //;
    @ViewChild('paginator1') paginator1!: MatPaginator;
   replyicon:string='<mat-icon >replay</mat-icon>';
   repliedicon:string='<mat-icon >done</mat-icon>';

  displayedColumns: string[] = ['Meeting Title', 'Description', 'Physician', 'Date','Time','Patient Details'];   
  dataSource = new MatTableDataSource<Appointments>(ELEMENT_DATA);
  showButton: boolean = false;
  newReceivedMsg:number=10;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  control = new FormControl();
  form!: FormGroup;
   public now: Date = new Date();
   filteredOptions!: Observable<User[]>;
   designation:string | undefined='';
   users!:User[];
   error! : string
   currentEmployee : any
   userdetail!: UserDetails

   constructor( private fb: FormBuilder, private inboxService: InboxService) {
      setInterval(() => {
        this.now = new Date();
      }, 1);

   }

  ngOnInit(): void {

    this.inboxService.GetEmployee().subscribe({
      next: (res: any) => {
        console.log(res)
        this.users.push(...res)
        var Get = localStorage.getItem('currentUser');

    if (typeof Get === 'string') {
      var id = JSON.parse(Get).id;
      alert(id);
      this.currentEmployee = this.users.filter(x => x.UserId == id)
    }
        //this.userdetail = JSON.stringify(data)
         
      },
      error: (e: any) => console.error(e),
    });

    //this.inboxService.

    ELEMENT_DATA.sort((x, y) => +new Date(x.date) - +new Date(y.date));
    //this.users=[{name:"Sam",designation:"Junior Doctor"},{name:"John",designation:"Developer"}]
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.form = this.fb.group({
      receiver: ['', Validators.required],
      designation: ['', Validators.required],
      message: ['', Validators.required]
  });

  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  OnClickName(designation : string){
    this.form.get('designation')?.patchValue(designation);
  }

  ngAfterViewInit() {
    this.SentdataSource.paginator = this.paginator2;
    this.RecieveddataSource.paginator = this.paginator1;
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
  }

  getBackgroundColor(date:Date) {
    let color = 'orange';
    let today: Date = new Date();
    let futureDay: Date = new Date(date);    
    if (this.isDatesEqual(today,futureDay)) {
      //console.log(today.getDate===futureDay.getDate);
      color = 'red'
    
    } else{
        color = '';
      }
    return color;
  }
 
  isDatesEqual(date1:Date, date2:Date):boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  OnSend(){
    var datetime = Date.now
    var filtereduser = this.users.find(x => x.name == this.form.value.name 
      && x.designation == this.form.value.designation)
    if(filtereduser === undefined){
      this.error = "User does not exsist";
      return
    }
      let newnote = {
      Message:this.form.value.message,
      NotesDateTime: datetime,
      name : filtereduser?.name,
      designation : filtereduser?.name
    }
    //this.dataSource2.data.push(newnote)
    this.SentdataSource._updateChangeSubscription(); 
    
    var notes = {
      Message:this.form.value.message,
      NotesDateTime: datetime,
      SenderEmployeeId : filtereduser?.Id,
      RecieverEmployeeId : filtereduser?.Id
    }

    console.log(notes)

    this.inboxService.SendNotes(notes)
    
  }

  onDelete(tabName: string,j:Notes )
  {
      console.log("Hii" + tabName)
      if(tabName == 'RECIEVED'){
        const index = this.RecieveddataSource.data.indexOf(j);
        this.RecieveddataSource.data.splice(index, 1);
        this.RecieveddataSource._updateChangeSubscription(); 
      }
      else if(tabName == 'SENT'){
        const index = this.SentdataSource.data.indexOf(j);
        this.SentdataSource.data.splice(index, 1);
        this.SentdataSource._updateChangeSubscription(); 
      }

      this.inboxService.DeleteEmployee(j.id)
  }
  

  OnReply(tabName: string, obj: ReceivedNotes) {
    for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
    if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) 
       {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
       }
     }
     this.form.controls?.['receiver'].patchValue(obj.senderName)
     this.form.controls?.['designation'].patchValue(obj.designation)
     
     //this.form.get('receiver').patchValue()

  }

}
