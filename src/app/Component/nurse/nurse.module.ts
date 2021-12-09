import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DynamicViewComponent } from './dynamic-view/dynamic-view.component';


@NgModule({
  declarations: [
    NurseDashboardComponent,
    AppointmentViewComponent,
    DynamicViewComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule, 
    MatTableDataSource
  ]
})
export class NurseModule { }
