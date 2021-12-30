import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { AdminService } from 'src/app/Services/admin.service';
import { PatientService } from 'src/app/Services/patient.service';
import { INITIAL_EVENTS, createEventId } from '../../../models/event.utils';

export class EventMap {
  // public id: string,
  constructor(
    public Id: string,
    public title: string,
    public date: string,
    public color: string
  ) {}
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  name!: string;
  date?: string;
  showModal!: boolean;
  ApproveModal!: boolean;
  calendarVisible = false;
  listOfEvent: EventMap[] = [];
  value: EventMap[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    var data = 'Nurse';

    // switch (true) {
    //   case data === 'Patient':
    //     this.PatientService();
    //     break;
    //   case data === 'Physician':
    //     this.PhysicianService();
    //     break;
    //   case data === 'Nurse':
    //     this.NurseService();
    //     break;
    //   case data === 'Admin':
    //     this.AdminService();
    //     break;
    //   default:
    //     this.Default();
    //     break;
    // }

    this.adminService
      .GetListofData()
      .subscribe((x) => {
        this.listOfEvent.push(...x);
        for (var i = 0; i < this.listOfEvent.length; i++) {
          var title = this.listOfEvent[i].title;
          var start = DateType(this.listOfEvent[i].date);
          this.value.push({
            Id: this.listOfEvent[i].Id,
            title: this.listOfEvent[i].title,
            date: this.listOfEvent[i].date,
            color: this.listOfEvent[i].color,
          });
        }
      })
      .add(() => {
        if (this.value.length > 0) {
          this.calendarVisible = true;
        }
      });

    function DateType(date: any): Date {
      var convertDate = new Date(date);

      return convertDate;
    }
  }

  // Servicecall() {
  //   this.PatientCalendar();
  //   {
  //   }
  // }

  PatientCalendar() {}
  PhysicianCalendar() {}
  NurseCalendar() {}
  AdminCalendar() {}
  DefaultCalendar() {}

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    //select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    height: 500,
    aspectRatio: 1.5,
    scrollTime: '00:00',
    events: this.value,
    // events: [
    //   {
    //     title: 'event 2',
    //     date: '2021-12-04 13:15:30',
    //     color: 'blue',
    //     id: '1234',
    //   },
    // ],
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: 'New Even Created',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.name = clickInfo.event.title;
    var dateparms = clickInfo.event._instance?.range.start;
    var ID = clickInfo.event._def?.publicId;
    var date = dateparms?.toDateString();
    var time = dateparms?.toTimeString();
    var color = clickInfo.event._def?.ui.backgroundColor;
    this.date = date;
    if (color == 'red') {
      this.ApproveModal = true;
    } else {
      this.showModal = true;
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  hide() {
    this.showModal = false;
  }
  Approvehide() {
    this.ApproveModal = false;
  }
}
