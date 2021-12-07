import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { PatientUserComponent } from './patient-user/patient-user.component';
import {MatCardModule} from '@angular/material/card';
import { EmployeeUserComponent } from './employee-user/employee-user.component';
import {MatTableModule} from '@angular/material/table';
=======
import { AddPhysicianComponent } from './add-physician/add-physician.component';
import { ViewPhysicianComponent } from './view-physician/view-physician.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug

//DataTable
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

//Http Issue
import { HttpClientModule } from '@angular/common/http';

//Edit table
// import { MatSort, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

//Model Export
import { EventMap } from '../admin/model/admin.model';

//Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);
>>>>>>> d4e2f2f2174312342a5d7024e1ceba2e61cab6d8

const routes: Routes = [
  {
    path: 'AdminDashBoard',
    component: AdminDashboardComponent,
  },
  {
<<<<<<< HEAD
    path:'PatientUser',
    component : PatientUserComponent
=======
    path: 'AddPhysician',
    component: AddPhysicianComponent,
  },
  {
    path: 'ViewPhysician',
    component: ViewPhysicianComponent,
  },
  {
    path: 'AdminCalender',
    component: AdminCalendarComponent,
>>>>>>> d4e2f2f2174312342a5d7024e1ceba2e61cab6d8
  },
];

@NgModule({
<<<<<<< HEAD
  declarations: [AdminDashboardComponent, PatientUserComponent, EmployeeUserComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    RouterModule.forChild(routes)],
=======
  declarations: [
    AdminDashboardComponent,
    AddPhysicianComponent,
    ViewPhysicianComponent,
    AdminCalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    //Full Calender
    FullCalendarModule,
    //Datatable
    MatTableModule,
    //Http
    HttpClientModule,
    //Edittable

    // MatSort,
    // MatSortModule,
    // MatTableDataSource,
    // MatFormFieldModule,

    //Forms
    FormsModule,
    ReactiveFormsModule,
  ],
>>>>>>> d4e2f2f2174312342a5d7024e1ceba2e61cab6d8
})
export class AdminModule {}
