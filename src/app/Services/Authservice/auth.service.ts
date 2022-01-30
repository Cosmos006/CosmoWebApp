import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormGroup } from '@angular/forms';
import { AnyObject } from 'chart.js/types/basic';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(formModel: FormGroup, user: User) {
    var loginModel = {
      UserName: formModel.value.username,
      Password: formModel.value.password,
    };
    console.log(loginModel);
    return this.http
      .post('https://localhost:44359/api/User/Login', loginModel)
      .subscribe({
        next: (res: any) => {
          // console.log(res)
          localStorage.setItem('token', res.token);
          //localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);
          //  return user;
          this.router.navigateByUrl('/Home');
        },
        error: (e) => console.error(e),
      });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  logout() {
    localStorage.removeItem('currentUser');
    const emptyDataResult: User = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      token: '',
      loggedIn: '',
    };
    this.currentUserSubject.next(emptyDataResult);
    //this.router.navigateByUrl('/login');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  getUserData() {
    return this.http.get<User[]>('https://localhost:44359/api/User/GetUser');
  }

  getUser(id : Guid| undefined){
    this.http.get('https://localhost:44359/api/User/' + id).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res))
      },
      error: (e) => console.error(e),
    })
  }
}
