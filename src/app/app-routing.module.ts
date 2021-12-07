import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './Component/admin/admin-dashboard/admin-dashboard.component';
import { AdminModule } from './Component/admin/admin.module';
import { PatientUserComponent } from './Component/admin/patient-user/patient-user.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
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
    component: PatientUserComponent,
    path: 'PatientUser',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
