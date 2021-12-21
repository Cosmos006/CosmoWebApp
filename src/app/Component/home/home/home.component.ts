import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/Modules/User';
import { AuthenticationService } from 'src/app/Services';
import { UserService } from 'src/app/Services/Userservice/userservice/user.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi!: User;
    id!: number;
    userid:any= localStorage.getItem('currentUser');
    isLoggedIn$!: Observable<boolean>; // {1}
   
  
  
   
  
  

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }

    ngOnInit() {
        this.loading = true;
    //    alert(this.userid);
        //this.getuserbyId();
      this.isLoggedIn$ = this.authenticationService.isLoggedIn; // {2}

    }
    getuserbyId(){
       
        this.userService.getById(this.userid).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
    
 
}