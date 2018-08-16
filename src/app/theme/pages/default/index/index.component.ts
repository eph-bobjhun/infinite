import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http } from '@angular/http';
import { ApiAsyncService } from '../../../../_services/api.async.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit, AfterViewInit {
    total: any;
    model: any = {};
    earnings: any = {};
    availableForWithdrawal: any;
    constructor(private _script: ScriptLoaderService, public http: Http,
                private _api: ApiAsyncService) {

    }
    async ngOnInit() {
        this.get();
    }

    async get(){
        let user = await this._api.get('users');
        this.model = user;
        this.earnings = user.earnings;
        console.log(this.earnings);
        this.total = this.earnings.loyaltyBonus + this.earnings.shareUpBonus + this.earnings.royaltyBonus + this.earnings.infiniteBonus + this.earnings.cycleBonus + this.earnings.equalBonus;
        this.availableForWithdrawal = await this.getTotal();
        console.log(this.availableForWithdrawal);
    }
    ngAfterViewInit() {

    }

    getTotal(){
        return new Promise( (resolve) =>{
            let withdrawals = this.model.withdrawals;
            var amount = 0;
            for(let i = 0;i <withdrawals.length;i++ ){
                amount = amount + withdrawals[i].amount;
            }
            amount = this.total - amount;
            resolve(amount);
        })
    }

}