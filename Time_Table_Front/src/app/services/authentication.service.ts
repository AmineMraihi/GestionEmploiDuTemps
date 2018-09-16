import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../services/auth.constant';
import {User} from '../models/user';
import {UserService} from './user.service';

@Injectable()
export class AuthenticationService {
    static AUTH_TOKEN = '/oauth/token';
    user: User;

    constructor(private http: Http, private userservice: UserService) {
    }


    login(username: string, password: string) {
        const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

        return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
            .map(res => res.json())
            .map((res: any) => {
                if (res.access_token) {
                    return res.access_token;
                }


                // store user details  in local storage to keep user logged in between page refreshes

            });
    }

    logOut() {
        // remove user from local storage to log user out
        return this.http.post('/server/logout', {})
            .map((response: Response) => {
                localStorage.removeItem('currentUser');
            });

    }

    setter(user: User) {
        this.user = user;
    }
}
