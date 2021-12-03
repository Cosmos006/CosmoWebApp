import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { LoginComponent } from './Component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Component/home/home.component';
import { PhysicianComponent } from './Component/physician/physician.component';
// import { MaterialModule } from './material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PatientDetailsComponent } from './Component/patient/patient-details/patient-details.component';
import { PatientBookappointmentComponent } from './Component/patient/patient-bookappointment/patient-bookappointment.component';
//khushabu
import { MatMomentDateModule } from '@angular/material-moment-adapter';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//calender
import { SchedulerModule } from 'angular-calendar-scheduler';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//full Calender
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plug
//Http
import { HttpClientModule } from '@angular/common/http';
import { ViewPhysicianComponent } from './Component/admin/view-physician/view-physician.component';
import { AdminCalendarComponent } from './Component/admin/admin-calendar/admin-calendar.component';

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
    PatientDetailsComponent,
    PatientBookappointmentComponent,
    ViewPhysicianComponent,
    AdminCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    FlexLayoutModule,
    MatCardModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    CdkTableModule,
    CdkStepperModule,
    MatRadioModule,
    MatSelectModule,
    //Full Calender
    FullCalendarModule,
    //Http
    HttpClientModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    FlexLayoutModule,
    MatCardModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    CdkTableModule,
    CdkStepperModule,
    MatRadioModule,
    MatSelectModule,
    //khushabu
    //MatMomentDateModule
    // MaterialModule,

    //Calender

    MatProgressSpinnerModule,
    //Full Calender
    FullCalendarModule,
    //Http
    HttpClientModule,
    //Edit Table
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
