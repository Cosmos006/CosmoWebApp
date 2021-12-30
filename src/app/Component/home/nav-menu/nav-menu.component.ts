import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from 'src/app/Modules/Role';
import { User } from 'src/app/Modules/User';
import { AuthenticationService } from 'src/app/Services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  styles: [
    `
      .angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
      }
      .fill-remaining-space {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class NavMenuComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>; // {1}
  currentUser?: User;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isPatient() {
    return this.currentUser && this.currentUser.role === Role.Patient;
  }

  get isPhysician() {
    return this.currentUser && this.currentUser.role === Role.Physician;
  }

  get isNurse() {
    return this.currentUser && this.currentUser.role === Role.Nurse;
  }
}
