import { Helpers } from '../../../../helpers'

export class AdminWithdrawalOptions {

    data: any;

    constructor(token,user) {
        this.data = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `${Helpers.apiUrl}withdrawals/all`,
                        method: 'GET',
                        params: {
                            query: {
                                
                            }
                        },
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                },

                pageSize: 10,
                saveState: {
                    cookie: false,
                    webstorage: false
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            layout: {
                theme: 'default', // datatable theme
                class: 'm-datatable--brand', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },
            sortable: true,
            pagination: true,
            search: {
                // search delay in milliseconds
                delay: 200,
                // input text for search
                input: $('#generalSearch'),
            },
            columns: [
                {
                    field: 'id',
                    title: '#',
                    sortable: false, // disable sort for this column
                    width: 40,
                    textAlign: 'center',
                    selector: { class: 'm-checkbox--solid m-checkbox--brand' },
                }, {
                    field: "amount",
                    title: "Amount",
                }, {
                    field: "method",
                    title: "Cash out option"
                }, {
                    field: "value",
                    title: "Name/number/Email/Wallet Address",
                    template: function(row){
                        if(row.method == 'Gcash'){
                            return row.value.phone;
                        }else if(row.method == 'Palawan'){
                            return row.value.name + "/\n"+ row.value.address + "/\n"+ row.value.phone;
                        }else{
                            return row.value.email + "/\n"+ row.value.walletAddress+"/\n"+row.value.phone;
                        }
                    }
                },{
                    field: "user",
                    title: "Account",
                    template: function(row){
                        return row.user.email;
                    }
                },{
                    field: "status",
                    title: "Status",
                    width: 150
                },{
                    field: "Actions",
                    title: "Actions",
                    sortable: false,
                    overflow: 'visible',
                    template: function(row) {
                        if(row.status == 'completed'){
                            return;
                        }
                        return '\
                            <a  class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill update custom-tooltip" data-id="'+ row.id + '" >\
                                <i class="la la-check"></i>\
                            </a>\
                        ';
                    }
                }
            ]
        }
    }

}