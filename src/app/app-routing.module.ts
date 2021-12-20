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
import { PatientDetailsComponent } from './Component/patient/patient-details/patient-details.component';
import { PatientViewdetailsComponent } from './Component/patient/patient-viewdetails/patient-viewdetails.component';
//import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { PhysicianComponent } from './Component/physician/physician.component';

const routes: Routes = [
  
  {
    component: PhysicianComponent,
    path: 'Physician',
    canActivate:[AuthGuard]
  },
  {
    component: AdminDashboardComponent,
    path: 'AdminDashboard',
    canActivate:[AuthGuard]
  },
  {
    component: PatientUserComponent,
    path: 'PatientUser',
    canActivate:[AuthGuard]
  },
  {
    component: AddPhysicianComponent,
    path: 'AddPhysician',
    canActivate:[AuthGuard]
  },
  {
    component: ViewPhysicianComponent,
    path: 'ViewPhysician',
    canActivate:[AuthGuard]
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
    canActivate:[AuthGuard]
  },
  {
    component: AppointmentViewComponent,
    path: 'AppointmentView',
    canActivate:[AuthGuard]
  },
  {
    component: PatientDetailsComponent,
    path: 'PatientDetails',
    canActivate:[AuthGuard]
  },
  {
    component: DynamicViewComponent,
    path: 'DynamicView',
    canActivate:[AuthGuard]
  },
  {
    component: PatientBookappointmentComponent,
    path: 'PatientBookappointment',
    canActivate:[AuthGuard]
  },
  {
    component: PatientViewdetailsComponent,
    path: 'PatientViewdetails',
    canActivate:[AuthGuard]
  },
  {
    component: AdminCalendarComponent,
    path: 'AdminCalender',
    canActivate:[AuthGuard]
  },
  { 
    path: '',
    component:LoginComponent
  },
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
