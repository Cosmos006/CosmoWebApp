import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
