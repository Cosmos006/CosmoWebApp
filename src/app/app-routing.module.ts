import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPhysicianComponent } from './Component/admin/add-physician/add-physician.component';
import { AdminCalendarComponent } from './Component/admin/admin-calendar/admin-calendar.component';
import { AdminDashboardComponent } from './Component/admin/admin-dashboard/admin-dashboard.component';
import { ViewPhysicianComponent } from './Component/admin/view-physician/view-physician.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { AppointmentViewComponent } from './Component/nurse/appointment-view/appointment-view.component';
import { NurseDashboardComponent } from './Component/nurse/nurse-dashboard/nurse-dashboard.component';
import { PatientBookappointmentComponent } from './Component/patient/patient-bookappointment/patient-bookappointment.component';
import { PatientDetailsComponent } from './Component/patient/patient-details/patient-details.component';
import { PatientViewdetailsComponent } from './Component/patient/patient-viewdetails/patient-viewdetails.component';
//import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { PhysicianComponent } from './Component/physician/physician.component';

const routes: Routes = [
  {
    // path: '',
    // component: NavMenuComponent
    component: HomeComponent,

    path: '',
  },
  {
    component: HomeComponent,

    path: 'home',
  },
  {
    component: LoginComponent,

    path: 'login',
  },
  {
    component: PhysicianComponent,

    path: 'Physician',
  },
  {
    component: AdminDashboardComponent,
    path: 'AdminDashboard',
  },
  {
    component: AddPhysicianComponent,
    path: 'AddPhysician',
  },
  {
    component: ViewPhysicianComponent,
    path: 'ViewPhysician',
  },
  {
    component: NurseDashboardComponent,
    path: 'NurseDashboard',
  },
  {
    component: AppointmentViewComponent,
    path: 'AppointmentView',
  },
  {
    component: PatientDetailsComponent,
    path: 'PatientDetails',
  },
  {
    component: PatientBookappointmentComponent,
    path: 'PatientBookappointment',
  },
  {
    component: PatientViewdetailsComponent,
    path: 'PatientViewdetails',
  },
  {
    component: AdminCalendarComponent,
    path: 'AdminCalender',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
