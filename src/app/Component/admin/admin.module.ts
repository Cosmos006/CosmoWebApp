import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'AdminDashBoard',
    component: AdminDashboardComponent,
  },
];

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
