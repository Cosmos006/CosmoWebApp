import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PatientBookappointmentComponent } from './patient-bookappointment/patient-bookappointment.component';
import { PatientViewdetailsComponent } from './patient-viewdetails/patient-viewdetails.component';
import { MatOption } from '@angular/material/core';


import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientBookappointmentComponent,
    PatientViewdetailsComponent,
    PatientDashboardComponent,
  ],
  imports: [
    CommonModule,
    
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatOption
    //AppModule
  ],
  exports: [],
})
export class PatientModule {}
