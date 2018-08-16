import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { JwtService } from '../../../_services/jwt.service';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    user: any = {};

    constructor(private _jwtService: JwtService) {

    }
    ngOnInit() {
        this.user = this._jwtService.getDecodedToken();
        console.log(this.user);
    }
    ngAfterViewInit() {

        mLayout.initAside();
        let menu = (<any>$('#m_aside_left')).mMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }

}