import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

export interface PeriodicElement {
  name: string;

  position: number;

  weight: number;

  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },

  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },

  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },

  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },

  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },

  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },

  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
];

@Component({
  selector: 'app-view-physician',
  templateUrl: './view-physician.component.html',
  styleUrls: ['./view-physician.component.css'],
})
export class ViewPhysicianComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource = ELEMENT_DATA;
  constructor(private userService: AdminService) {}

  ngOnInit(): void {}
}