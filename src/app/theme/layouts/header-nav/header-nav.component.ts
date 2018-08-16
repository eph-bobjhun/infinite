import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { JwtService } from "../../../_services/jwt.service";
declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

    user: any = {};
    constructor(private _jwtService: JwtService) {
       this.user.imageUrl = './assets/app/media/img/users/user4.jpg';

    }
    ngOnInit() {
        // this.user = this._jwtService.getDecodedToken();
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}