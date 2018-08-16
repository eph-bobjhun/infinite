import { Component, OnInit, ViewEncapsulation, AfterViewInit, Compiler, ElementRef,HostListener  } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Routes, RouterModule } from '@angular/router';
import { GenealogyOptions } from './genealogy.options';
import { ApiAsyncService } from '../../../../_services/api.async.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./genealogy.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./genealogy.component.css"]
})
export class GenealogyComponent implements OnInit, AfterViewInit {
    items: any =['cat','dog']
    datatable: any;
    dr: any = [];
    dr2: any = [];
    htmlData: any;
    constructor(private _script: ScriptLoaderService,
                private _apiService: ApiAsyncService,
                private _domSanitizer: DomSanitizer,
                private compiler: Compiler,
                private elRef: ElementRef) {

    }
    async ngOnInit() {
        this.dr = await this._apiService.get('drs');
    }

     @HostListener('body:click', ['$event'])
      clickout(event) {
         if(event.target.id == 'clicked'){
             return;
         }
         this.addDownline(event.target.name);
      }
    ngAfterViewInit() {

    }

    async addDownline(id:any){
       
       let el = $(this.elRef.nativeElement).find(`a[name=${id}]`);
       el.attr('id','clicked');
        this.dr2 = await this._apiService.get('drs',id);
        let template1 = '<ul>';
        let template2 = '</ul>'
        let template = '';
        let final = '';
        for(let i = 0; i < this.dr2.length;i++){
            template += `<li id="${this.dr2[i].dr.id}">
                            <a name="${this.dr2[i].dr.id}" class="parent ${this.dr2[i].dr.id}">${this.dr2[i].dr.lastName}, ${this.dr2[i].dr.firstName}</a>
                        </li>`;
        }

        final = template1 + template + template2;

        $(`#${id}`).append(final);
        // console.log(this.dr2);
        // this.htmlData= `<div *ngFor="let y of  dr2" style="border: 1px solid red;"><h2>Safe Html</h2><span class="user-content">Server prepared this html block.</span></div>`;
    }

}