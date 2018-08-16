import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { DirectRefOptions } from './directref.options';
import { JwtService } from '../../../../_services/jwt.service';
import { ApiAsyncService } from '../../../../_services/api.async.service';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./directref.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./directref.component.css"]
})
export class DirectRefComponent implements OnInit, AfterViewInit {
    data: any ={};
    datatable: any;
    user: any;
    token : string = '';
    constructor(private _script: ScriptLoaderService,
                private _jwtService: JwtService,
                private _api: ApiAsyncService) {

    }
    async ngOnInit() {
        this.data = await this._api.get('dr');
        this.setTable();
        this.user = this._jwtService.getDecodedToken();
        this.token = this._jwtService.getToken();
    }

    setTable(){
        console.log(this.data);
        let options = new DirectRefOptions(this.token,this.data);
        this.datatable = (<any>$('#directref')).mDatatable(options.data);
    }
    ngAfterViewInit() {
        
    }

}