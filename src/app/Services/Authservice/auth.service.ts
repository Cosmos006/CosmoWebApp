import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/app/Modules/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,private http: HttpClient
  ) {}

//   login(username: string, password: string) {
//     return this.http.post<any>(`/users/authenticate`, { username: username, password: password })
//         .pipe(map(user => {
//             // login successful if there's a jwt token in the response
//             if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(user));
//             }

//             return user;
//         }));
// }

login(user: User) {
  if (user.username !== '' && user.password !== '' ) {
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }
}

logout() {
  this.loggedIn.next(false);
  this.router.navigate(['/login']);
}
}
