import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { Helpers } from "../../helpers";
import { JwtService } from "../../_services/jwt.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private _router: Router,
        private _authService: AuthenticationService,
        private _jwtService: JwtService) {
    }

    ngOnInit(): void {
        Helpers.setLoading(true);
        // reset login status
        this._jwtService.removeToken();
        this._router.navigate(['/login']);
    }
}