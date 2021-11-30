import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddPhysicianComponent } from './add-physician/add-physician.component';
import { ViewPhysicianComponent } from './view-physician/view-physician.component';

const routes: Routes = [
  {
    path: 'AdminDashBoard',
    component: AdminDashboardComponent,
  },
  {
    path: 'AddPhysician',
    component: AddPhysicianComponent,
  },
  {
    path: 'ViewPhysician',
    component: ViewPhysicianComponent,
  },
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddPhysicianComponent,
    ViewPhysicianComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
