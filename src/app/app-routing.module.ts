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
import { HomeComponent } from './Component/home/home/home.component';
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
import { Role } from './Modules/Role';


const routes: Routes = [
 
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
},
// {
//   path: '', pathMatch: 'full', redirectTo: 'login'
// },

  { 
    path: 'login',
    component: LoginComponent,
  },
 
  {
    component: PhysicianComponent,
    path: 'Physician',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician] }
  },
  {
    component: AdminDashboardComponent,
    path: 'AdminDashboard',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    component: PatientUserComponent,
    path: 'PatientUser',
    canActivate: [AuthGuard],
    data: { roles: [Role.User]}
  },
  {
    component: AddPhysicianComponent,
    path: 'AddPhysician',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician]}
  },
  {
    component: ViewPhysicianComponent,
    path: 'ViewPhysician',
    canActivate: [AuthGuard],
    data: { roles: [Role.Physician]}
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
    canActivate: [AuthGuard],
    data: { roles: [Role.Nurse]}
  },
  {
    component: AppointmentViewComponent,
    path: 'AppointmentView',
  },
  {
    component: PatientDetailsComponent,
    path: 'PatientDetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient]}
  },
  {
    component: DynamicViewComponent,
    path: 'DynamicView',
  },
  {
    component: PatientBookappointmentComponent,
    path: 'PatientBookappointment',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient]}
  },
  {
    component: PatientViewdetailsComponent,
    path: 'PatientViewdetails',
    canActivate: [AuthGuard],
    data: { roles: [Role.Patient]}
  },
  {
    component: PatientDashboardComponent,
    path: 'PatientDashboard',
  },
  {
    component: AdminCalendarComponent,
    path: 'AdminCalender',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin]}
  },
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
