import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AddPhysicianComponent } from './Component/admin/add-physician/add-physician.component';
import { AdminCalendarComponent } from './Component/admin/admin-calendar/admin-calendar.component';
import { AdminDashboardComponent } from './Component/admin/admin-dashboard/admin-dashboard.component';
import { PatientUserComponent } from './Component/admin/patient-user/patient-user.component';
import { ViewPhysicianComponent } from './Component/admin/view-physician/view-physician.component';
import { ForgotpasswordComponent } from './Component/home/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Component/home/login/login.component';
import { NavMenuComponent } from './Component/home/nav-menu/nav-menu.component';
import { RegisterComponent } from './Component/home/Register/register.component';
import { AppointmentViewComponent } from './Component/nurse/appointment-view/appointment-view.component';
import { DynamicViewComponent } from './Component/nurse/dynamic-view/dynamic-view.component';
import { NurseDashboardComponent } from './Component/nurse/nurse-dashboard/nurse-dashboard.component';
import { PatientBookappointmentComponent } from './Component/patient/patient-bookappointment/patient-bookappointment.component';
import { PatientDashboardComponent } from './Component/patient/patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './Component/patient/patient-details/patient-details.component';
import { PatientViewdetailsComponent } from './Component/patient/patient-viewdetails/patient-viewdetails.component';
//import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { PhysicianComponent } from './Component/physician/physician.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
    component: PatientUserComponent,
    path: 'PatientUser',
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
    component: RegisterComponent,
    path: 'Signup',
  },
  {
    component: ForgotpasswordComponent,

    path: 'forgotpassword',
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
    component: DynamicViewComponent,
    path: 'DynamicView',
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
    component: PatientDashboardComponent,
    path: 'PatientDashboard',
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
