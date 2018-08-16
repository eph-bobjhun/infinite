import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { CodesOptions } from './codes.options';
import { JwtService } from '../../../../_services/jwt.service';
import { ApiAsyncService } from '../../../../_services/api.async.service'; 
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./codes.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./codes.component.css"]
})
export class CodesComponent implements OnInit, AfterViewInit {

    datatable: any;
    user: any;
    token : string = '';
    constructor(private _script: ScriptLoaderService,
                private _jwtService: JwtService,
                private _apiService: ApiAsyncService,
                private _toastr: ToastrService) {

    }
    ngOnInit() {
        this.user = this._jwtService.getDecodedToken();
        this.token = this._jwtService.getToken();
    }

    ngAfterViewInit() {
        let options = new CodesOptions(this.token, this.user);
        this.datatable = (<any>$('#projects')).mDatatable(options.data);
    }


    async request(){
        try{
            let code = await this._apiService.post('codes');
            this.datatable.reload();
            this._toastr.success('Success');
        }catch(e){
            this._toastr.error('Error', e.error.err);
        }
    }
}