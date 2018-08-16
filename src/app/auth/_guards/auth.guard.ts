import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { JwtService } from "../../_services/jwt.service";
import * as decode from 'jwt-decode';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _jwtService: JwtService) {
    }

    canActivate() {
        let token = this._jwtService.getToken();
        console.log(token);
        if (token) {
            // logged in so return true
            let decodedToken = decode(token);
            console.log(decodedToken);
            return true;
        }

        // not logged in so redirect to login page
        this._router.navigate(['/login']);
        return false;
    }
}


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private _router: Router, private _jwtService: JwtService) {
    }

    canActivate() {
        let token = this._jwtService.getDecodedToken();
        console.log(token);
        if (token.role == 'admin') {
            return true;
        }

        // not logged in so redirect to login page
        this._router.navigate(['/']);
        return false;
    }
}
