import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddPhysicianComponent } from './add-physician/add-physician.component';
import { ViewPhysicianComponent } from './view-physician/view-physician.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug

//DataTable
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

//Datateble
import { MatTabsModule } from '@angular/material/tabs';
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
import { PatientUserComponent } from './patient-user/patient-user.component';
import { DynamicTableComponent } from '../reusable/dynamic-table/dynamic-table.component';

//Import Dynamic table

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

const routes: Routes = [
  {
    path: 'AdminDashBoard',
    component: AdminDashboardComponent,
  },
  {
    path: 'PatientUser',
    component: PatientUserComponent,
  },
  {
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
  },
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddPhysicianComponent,
    ViewPhysicianComponent,
    AdminCalendarComponent,
    DynamicTableComponent,
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
})
export class AdminModule {}
