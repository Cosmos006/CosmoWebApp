import {Component, ViewChild,OnInit} from '@angular/core';
import { MatSort} from '@angular/material/sort';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { products } from './appointments';

/**
 * @title Table with sorting
 */
 @Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent  {
displayedColumns = ['productName', 'productCode', 'prodRating', 'edit', 'delete'];
//products:Product[]= products;
dataSource = new MatTableDataSource(products);
@ViewChild(MatPaginator) paginator !: MatPaginator;
@ViewChild(MatSort, {}) sort !: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   ngOnInit() {
    //this.dataSource = this.products;
    //this.dataSource.paginator = this.paginator;

  }



// filterProduct(value: string):void{
//     this.dataSource.filter = value.trim().toLowerCase();
//  this.serviceAPI.getDataByFilter(value).subscribe(response =>
//  {
//    this.dataSource= response['products'];

//  });
//   }

  

}
