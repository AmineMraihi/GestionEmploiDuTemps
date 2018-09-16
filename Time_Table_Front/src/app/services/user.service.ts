import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {TOKEN_NAME} from '../services/auth.constant';
import {JwtHelper} from 'angular2-jwt';
import {User} from '../models/user';
import {Seance} from '../models/seance';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };
const
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

@Injectable()
export class UserService {

    jwtHelper: JwtHelper = new JwtHelper();
    private headers = new Headers({'Content-Type': 'application/json'});
    accessToken: string;
    isAdmin: boolean;
    private options = new RequestOptions({headers: this.headers});


    constructor(private _http: Http, private http: HttpClient) {
    }

    // getUsers() {
    //   return this.httpClient.get('server/users');
    // }
    //
    // getUserUsernamePassword(username: string, password: string) {
    //   return this.httpClient.get('server/users/user/' + username + '/' + password);
    // }
    //
    // sendUserInfo(user) {
    //   const body = JSON.stringify(user);
    //   return this.httpClient.post('server/users', body, httpOptions);
    // }

    login(accessToken: string) {
        const decodedToken = this.jwtHelper.decodeToken(accessToken);
        console.log(decodedToken);

        this.isAdmin = decodedToken.authorities.some(el => el === '');
        this.accessToken = accessToken;

        localStorage.setItem(TOKEN_NAME, accessToken);
    }

    logout() {
        this.accessToken = null;
        this.isAdmin = false;
        localStorage.removeItem(TOKEN_NAME);
    }

    isAdminUser(): boolean {
        return this.isAdmin;
    }

    isUser(): boolean {
        return this.accessToken && !this.isAdmin;
    }

    getUser(username) {
        return this._http.get('/server/users/username/' + username , this.options)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        return Observable.throw(error || 'SERVER ERROR');
    }

    create(user: User) {
        return this.http.post('/server/users/signup/', user);
    }

    getRole() {
        return this.http.get('server/roles/', httpOptions);
    }


    updateUser(user: User) {
        let body = JSON.stringify(user);
        return this.http.put('/server/users/updateuser', body, httpOptions);
    }

    deleteUser(id: Number) {
        return this.http.delete('/server/users/deleteuser/' + id, httpOptions);
    }

    getuser1() {
        return this.http.get('/server/users');
    }

    usernameExist(username: String) {
        return this.http.get('/server/users/username/' + username, httpOptions);
    }

}
