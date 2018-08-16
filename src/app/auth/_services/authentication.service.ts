import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Helpers } from '../../helpers';
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {

    constructor(private httpClient: HttpClient, ) {
    }

    login(obj: any = {}) {
        return this.httpClient.post(`${Helpers.apiUrl}authenticate`, { "email": obj.email, "password": obj.password })
            .catch((error: any) => Observable.throw(error));
    }

    signUp(obj: any = {}, uplineRefCode: string = '') {
        console.log(uplineRefCode);
        return this.httpClient.post(`${Helpers.apiUrl}users?r=${uplineRefCode}`, obj)
            .catch((error: any) => Observable.throw(error));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}