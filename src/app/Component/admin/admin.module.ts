import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { PatientUserComponent } from './patient-user/patient-user.component';
import {MatCardModule} from '@angular/material/card';
import { EmployeeUserComponent } from './employee-user/employee-user.component';
import {MatTableModule} from '@angular/material/table';

const routes: Routes = [
  {
    path: 'AdminDashBoard',
    component: AdminDashboardComponent,
  },
  {
    path:'PatientUser',
    component : PatientUserComponent
  },
];

@NgModule({
  declarations: [AdminDashboardComponent, PatientUserComponent, EmployeeUserComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    RouterModule.forChild(routes)],
})
export class AdminModule {}
