import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { ApiAsyncService } from '../../../../_services/api.async.service';
import { JwtService } from '../../../../_services/jwt.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./my-account.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./my-account.component.css"]
})
export class MyAccountComponent implements OnInit, AfterViewInit {
    isActivated: boolean = false;
    datatable: any;
    model: any = {};
    code: string = '';
    constructor(private _script: ScriptLoaderService,
        private _api: ApiAsyncService,
        private _jwt: JwtService,
        private _toastr: ToastrService) {

    }
    async ngOnInit() {
        // let user = this._jwt.getDecodedToken();
        // this.model = user;
        this.getDetails();
        
    }

    async getDetails(){
        let user = await this._api.get('users');
        console.log(user);
        this.model = user;
        this.isActivated = user.account.isActivated;
        console.log(this.model);
    }
    ngAfterViewInit() {


        // let options = new GenealogyOptions();
        // console.log(options.data);
        // this.datatable = (<any>$('#user-management')).mDatatable(options.data);
    }


    async activate(){
        if(!this.code){
            this._toastr.error('Error', 'No code found !');
            return;
        }
        try{
            var submit = await this._api.post('activate',{code:this.code});
        }catch(e){
            console.log(e);
            this._toastr.error(e.error.err);
        }
        console.log(submit);
        if(submit){
            this._toastr.success('Account Activated !');
            this.getDetails();
            this.code = '';
        }
        
        
    }

}