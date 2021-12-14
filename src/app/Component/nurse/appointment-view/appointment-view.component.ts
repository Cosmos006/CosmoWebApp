import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDailogeComponent } from '../dailoge/edit-dailoge/edit-dailoge.component';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { Product } from 'src/app/models/appointment';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent {
  displayedColumns = ['id', 'name', 'gender', 'address', 'mobile', 'age', 'bloodGroup', 'temparature', 'bloodPresure', 'sugarLevel', 'edit', 'delete'];
  dataSource1 !: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, {}) sort !: MatSort;

  constructor(public dialogService: MatDialog, public appoiService: DailogeService) { }

  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.appoiService.getAppointmentData().subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data)    
      this.dataSource1.paginator = this.paginator;
    });
  }
  startEdit(data: any[]) {    
    const dialogRef = this.dialogService.open(EditDailogeComponent, {
      data: { data }
    });
    dialogRef.afterClosed()
  }
  applyFilter(filterValue: any) {
    let itemvalue = filterValue.target.value;   
    this.dataSource1.filter = itemvalue.trim().toLowerCase();
    this.dataSource1.paginator = this.paginator;

  }
  onDelete(rowid: number) {
    this.appoiService.deletePostapp(rowid);
    this.getdata();
  }

}


function ELEMENT_DATA(ELEMENT_DATA: any) {
  throw new Error('Function not implemented.');
}

