import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as decode from 'jwt-decode';
@Injectable()
export class JwtService {

    cachedRequests: Array<HttpRequest<any>> = [];

    public setToken(token) {
        localStorage.setItem('token', token);
    }

    public getToken() {
        let token = localStorage.getItem('token') || '';
        return token;
    }

    public getDecodedToken() {
        let token = localStorage.getItem('token') || '';
        let decodedToken = decode(token);
        return decodedToken;
    }
    public removeToken() {
        return localStorage.removeItem('token');
    }

    public isAuthenticated(): boolean {
        // get the token
        // const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        // return tokenNotExpired(null, token);
        return true;
    }

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
    public retryFailedRequests(): void {

    }
}
