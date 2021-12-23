import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AppointmentViewComponent } from './Component/nurse/appointment-view/appointment-view.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

//khushabu
//import { MatMomentDateModule } from '@angular/material-moment-adapter';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { SchedulerModule } from 'angular-calendar-scheduler';

//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug
//Http
import { HttpClientModule } from '@angular/common/http';
import { ViewPhysicianComponent } from './Component/admin/view-physician/view-physician.component';
//Component
import { AppComponent } from './app.component';
import { AdminCalendarComponent } from './Component/admin/admin-calendar/admin-calendar.component';
import { AddPhysicianComponent } from './Component/admin/add-physician/add-physician.component';
import { PatientBookappointmentComponent } from './Component/patient/patient-bookappointment/patient-bookappointment.component';
import { PhysicianComponent } from './Component/physician/physician.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavMenuComponent } from './Component/home/nav-menu/nav-menu.component';
import { LoginComponent } from './Component/home/login/login.component';
import { HomeComponent } from './Component/home/home/home.component';
import { DynamicTableComponent } from './Component/reusable/dynamic-table/dynamic-table.component';
import { ChartComponent } from './Component/reusable/chart/chart.component';
//Internet Check
import { NetworkStatusAngularModule } from 'network-status-angular';
import { PatientDetailsComponent } from './Component/patient/patient-details/patient-details.component';
import { RegisterComponent } from './Component/home/Register/register.component';
import { ForgotpasswordComponent } from './Component/home/forgotpassword/forgotpassword.component';
import { UserService } from './Services/Userservice/userservice/user.service';
import { DynamicViewComponent } from './Component/nurse/dynamic-view/dynamic-view.component';
import { EditDailogeComponent } from './Component/nurse/dailoge/edit-dailoge/edit-dailoge.component';
import { PatientDashboardComponent } from './Component/patient/patient-dashboard/patient-dashboard.component';
//fakebackend

import {  HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { AuthGuard, fakeBackendProvider } from './_helpers';


import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AuthenticationService } from './Services';



import { MatTablegridComponent } from './Component/nurse/mat-tablegrid/mat-tablegrid.component';
//Edit Table
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent,
    PhysicianComponent,
    AppointmentViewComponent,
    PatientDetailsComponent,
    PatientBookappointmentComponent,
    ViewPhysicianComponent,
    AdminCalendarComponent,
    AddPhysicianComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    DynamicViewComponent,

    DynamicTableComponent,
    EditDailogeComponent,
    ChartComponent,
    PatientDashboardComponent,
    MatTablegridComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatGridListModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //Material Component
    MaterialModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    CdkTableModule,
    CdkStepperModule,
    MatRadioModule,

    //Full Calender
    FullCalendarModule,
    //Http
    HttpClientModule,
    //Internet Check
    NetworkStatusAngularModule.forRoot(),
    MatProgressSpinnerModule,
  ],
  exports: [],
  providers: [UserService,AuthGuard,AuthenticationService,  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
