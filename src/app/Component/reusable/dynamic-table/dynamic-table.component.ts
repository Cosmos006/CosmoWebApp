import {
  Component,
  ViewChild,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
 

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  @Input() displayedColumns?: string[];
  @Input() receivedData: any;
  @Input() tableTitle?: string;
  @Input() columns: any[] = [];
  @Input() metaCount?: number;

  @Output() clickedItem = new EventEmitter();
  @Output() pageEvent = new EventEmitter<PageEvent>();

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  pageIndex = 0;
  pageSize = 10;
  length = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.columns !== undefined || this.columns !== null) {
      console.log(this.receivedData);
      this.dataSource = new MatTableDataSource(this.receivedData);
console.log("vamsi"+this.paginator)
      this.displayedColumns = this.columns.map((x) => x.columnDef);
      this.dataSource.paginator = this.paginator;

      // this.dataSource.paginator.pageSize = this.pageSize;
      this.dataSource.paginator.pageIndex = this.pageIndex;

      this.dataSource.paginator.length = this.receivedData.length;
    }
  }

  ngOnChanges() {
//     if (this.columns !== undefined || this.columns !== null) {
//       console.log(this.receivedData);
//       this.dataSource = new MatTableDataSource(this.receivedData);
// console.log("vamsi"+this.paginator)
//       this.displayedColumns = this.columns.map((x) => x.columnDef);
//       this.dataSource.paginator = this.paginator;

//       // this.dataSource.paginator.pageSize = this.pageSize;
//       this.dataSource.paginator.pageIndex = this.pageIndex;

//       this.dataSource.paginator.length = this.receivedData.length;
//     }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateProductsTable(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1; // API starts 1, Mat-Table starts at 0

    this.pageEvent.emit(event);
  }

  viewItem(guid: any) {
    this.clickedItem.emit(guid);
  }
}
