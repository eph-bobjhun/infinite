import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JwtService } from './jwt.service';

import { ToastrService } from 'ngx-toastr';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(
        private jwtService: JwtService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + this.jwtService.getToken())
        });
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            console.log("interceptor Error", err)
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.jwtService.collectFailedRequest(request);
                    this.toastr.error('Please login', "Unauthorized");
                    this.router.navigate(['/login']);
                }
            }
        });;

    }
}