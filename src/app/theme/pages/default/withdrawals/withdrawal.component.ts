import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { WithdrawalOptions } from './withdrawal.options';
import { JwtService } from '../../../../_services/jwt.service';
import { ApiAsyncService } from '../../../../_services/api.async.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./withdrawal.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./withdrawal.component.css"]
})
export class WithdrawalComponent implements OnInit, AfterViewInit {
    datatable: any;
    user: any;
    token : string = '';
    model: any ={};
    populate: any = {};
    amount: number = 0;
    earnings: number = 0;
    json: any ={};
    constructor(private _script: ScriptLoaderService,
                private _jwtService: JwtService,
                private _apiService: ApiAsyncService,
                private _toastr: ToastrService,
                private _api: ApiAsyncService) {
    }
    async ngOnInit() {
        this.user = this._jwtService.getDecodedToken();
        this.token = this._jwtService.getToken();
    }
    ngAfterViewInit() {
        let options = new WithdrawalOptions(this.token, this.user);
        this.datatable = (<any>$('#withdrawals')).mDatatable(options.data);
    }

    async withdraw() {
        console.log(this.model);
        this.model.value = this.json;
        try{
            let submit = await this._apiService.post('withdrawals',this.model);
            this.model = {};
            this._toastr.success('Success ! Please wait for 1-2 business days for your withdrawal');
            this.datatable.reload();
        }catch(e){
            this._toastr.error('Error',e.error.err);
        }
    }

}