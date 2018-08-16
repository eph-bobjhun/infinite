import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AdminWithdrawalOptions } from './adminwithdrawal.options';
import { JwtService } from '../../../../_services/jwt.service';
import { ApiAsyncService } from '../../../../_services/api.async.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./adminwithdrawal.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./adminwithdrawal.component.css"]
})
export class AdminWithdrawalComponent implements OnInit, AfterViewInit {
    datatable: any;
    user: any;
    token : string = '';
    model: any ={};

    constructor(private _script: ScriptLoaderService,
                private _jwtService: JwtService,
                private _apiService: ApiAsyncService,
                private _toastr: ToastrService,
                private elRef: ElementRef) {

    }
    ngOnInit() {
        this.user = this._jwtService.getDecodedToken();
        this.token = this._jwtService.getToken();
    }
    ngAfterViewInit() {
        var _self = this;
        let options = new AdminWithdrawalOptions(this.token, this.user);
        this.datatable = (<any>$('#withdrawals')).mDatatable(options.data);

        this.datatable.on('m-datatable--on-layout-updated', function(e) {


            $(_self.elRef.nativeElement).find('.update').click(function(evt) {
                var item = {
                    id: $(this).data('id'),
                    status: 'completed'
                }
                _self.update(item);
                evt.stopPropagation();
                evt.preventDefault();
            });
        });
    }

    async update(item:any) {
        try{
            let submit = await this._apiService.update('withdrawals',item.id,item);
            this.model = {};
            this._toastr.success('Success !');
            this.datatable.reload();
        }catch(e){
            this._toastr.error('Error',e.error.err);
        }
    }
}