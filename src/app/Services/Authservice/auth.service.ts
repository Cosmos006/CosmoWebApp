import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Modules/User';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private loggedIn = new BehaviorSubject<boolean>(false); // {1}

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }
   
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.loggedIn.next(true);
                }

                return user;
            }));
         
    }



    // logout() {
    //     // remove user from local storage to log user out


    //     const user = localStorage.removeItem('currentUser');
    //     if (user == null) {
    //         this.router.navigate(['login']);

    //     }
    // }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);

      }


}
