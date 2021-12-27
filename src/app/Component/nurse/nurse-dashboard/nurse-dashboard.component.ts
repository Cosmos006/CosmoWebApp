import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { data } from '../../../models/dynamic_data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent implements OnInit {

  productSearchForm?: FormGroup;
  showProgress = false;
  showTableResults = false;

  results = data;
  allResults = data;
  fakeData: any;

  //row: any;

  //test
  value?: string = 'abcd';
  columns: any[] = [
    {
      columnDef: 'id',
      header: 'ID',
      dataName: (row: { id: any }) => `${row.id}`,
    },
    
    {
      columnDef: 'name',
      header: 'Name',
      dataName: (row: { name: any }) => `${row.name}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      dataName: (row: { status: any }) => `${row.status}`,
    },   
    {
      columnDef: 'detailBtn',
      header: 'Action',
      dataName: (row: { guid: any }) => `${row.guid}`,
    },
  ];
  pageIndex = 1;
  pageSize = 5;
  metaCount?: number;

  constructor(private userService: AdminService,private router:Router) {
    this.fakeData = data;
  }

  ngOnInit() {
    this.productSearchForm = new FormGroup({
      productSearchBox: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    this.getProductsSearched(this.productSearchForm?.value.productSearchBox);
  }

  getProductsSearched(searchTerm: any) {
    alert(searchTerm)
    this.allResults = this.fakeData;
  }

  getAllProducts(pageIndex: number, pageSize: number) {
    // this.productSearchForm.reset(); // clear search field for better UX
console.log(pageIndex,pageSize);
    this.allResults = this.fakeData;
    this.metaCount = this.results.length;
    // console.log(this.metaCount);
    // console.log(this.results)
  }

  tabClick(tab: any) {
    if ((tab.index = 1)) {
      this.getAllProducts(this.pageIndex, this.pageSize);
    }
  }

  // Functions used by data-table component
  updatePagination(event: any) {
    console.log(event);
    const correctedIndex = event.pageIndex + 1;
    this.getAllProducts(correctedIndex, event.pageSize);
  }

  viewItem(guid: any) {
    alert(guid);
  let da=  this.fakeData.find((i: { guid: any; })=>i.guid==guid)
  alert(da.name);
  }
  
  Onsubmit(){
    console.log("vamsiclicked")
    this.router.navigateByUrl('/AppointmentView');
  }

}
