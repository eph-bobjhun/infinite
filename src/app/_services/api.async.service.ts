import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Helpers } from '../helpers'

import * as _ from 'lodash';

@Injectable()
export class ApiAsyncService {

    apiUrl: string = Helpers.apiUrl;

    endpoints: any = {
        'users': 'users/',
        'activate': 'activate/',
        'requestedCodes': 'requestedcodes',
        'dr': 'users/finddrs',
        'withdrawals': 'withdrawals/',
        'drs': 'directreferrals/infinite/',
        'codes': 'codes/'
    }


    constructor(
        private httpClient: HttpClient
    ) { }

    async get(endpoint: string, id: string = '', paramaters = {}): Promise<any> {
        let url;
        if (!this.endpoints[endpoint]) url = this.apiUrl + endpoint;
        else url = this.apiUrl + this.endpoints[endpoint];

        let params = this.setParams(paramaters)

        const response = await this.httpClient.get(url + id, { params: params }).toPromise();
        return response;
    }

    async post(endpoint: string, data: any = {}) {
        let url;
        if (!this.endpoints[endpoint]) url = this.apiUrl + endpoint;
        else url = this.apiUrl + this.endpoints[endpoint];

        const response = await this.httpClient.post(url, data).toPromise();
        return response;
    }

    async update(endpoint: string, id: string, data: any = {}) {
        let url;
        if (!this.endpoints[endpoint]) url = this.apiUrl + endpoint;
        else url = this.apiUrl + this.endpoints[endpoint];

        const response = await this.httpClient.patch(url + id, data).toPromise();
        return response;
    }

    async delete(endpoint: string, id: string = '') {
        let url;
        if (!this.endpoints[endpoint]) url = this.apiUrl + endpoint;
        else url = this.apiUrl + this.endpoints[endpoint];

        const response = await this.httpClient.delete(url + id).toPromise();
    }

    setParams(obj: object = {}) {
        let params = new HttpParams();

        _.forIn(obj, function(value, key) {
            params = params.append(key, value);
        });

        return params;
    }
}

