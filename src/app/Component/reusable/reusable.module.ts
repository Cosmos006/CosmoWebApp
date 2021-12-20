import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../reusable/dynamic-table/dynamic-table.component';
import { ChartComponent } from './chart/chart.component';
//Table
import { MatTableModule } from '@angular/material/table';
// import { MaterialModule } from 'src/app/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InboxComponent } from './inbox/inbox.component';

//Import mat module

@NgModule({
  declarations: [DynamicTableComponent, ChartComponent, InboxComponent],
  imports: [
    CommonModule,
    MatTableModule,
    //MaterialModule
  ],
})
export class ReusableModule {}
