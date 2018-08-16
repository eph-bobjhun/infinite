import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { Helpers } from "../helpers";
import { AuthenticationService } from "./_services/authentication.service";
import { JwtService } from "../_services/jwt.service";
import { ScriptLoaderService } from "../_services/script-loader.service";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/filter';

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login-2.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    uplineRefCode: string = '';
    busy = false;
    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private _jwtService: JwtService,
        private _toastr: ToastrService) {
    }

    ngOnInit() {
        var _self = this;
        this.model.remember = true;
        this._route.queryParams
            .subscribe(params => {
                _self.uplineRefCode = params.r;
            });

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }


    signin() {
        let _self = this;
        this.busy = true;
        this._authService.login(this.model)
            .subscribe((data) => {
                this._jwtService.setToken(data.token);
                this._router.navigate(['/index']);
                //this.getInfo(data.token);
            }, (error) => {
                this._toastr.error('Error',error.error.err);
            });
    }

    signup() {
        this.loading = true;
        if (!this.uplineRefCode) {
            this._toastr.error('Error', 'No Referral Code Found !');
            this.loading = false;
            return;
        }

        if (this.model.password != this.model.rpassword) {
            this._toastr.error('Error', 'Password do not match !');
            this.loading = false;
            return;
        }
        this._authService.signUp(this.model, this.uplineRefCode)
            .subscribe((data) => {
                this._toastr.success('Success ! Please press cancel to go back to login form');
                this.loading = false;
            }, (error) => {
                console.log(error);
                if(error.error.code == 'E_UNIQUE'){
                    error.error.err = ' Email already registered !'
                }
                this._toastr.error('Error', error.error.err);
                this.loading = false;
            });
    }

    forgotPass() {
        this.loading = true;
        this._userService.forgotPassword(this.model.email)
            .subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertForgotPass');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}