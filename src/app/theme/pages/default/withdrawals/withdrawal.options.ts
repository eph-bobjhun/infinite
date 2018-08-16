import { Helpers } from '../../../../helpers'

export class WithdrawalOptions {

    data: any;

    constructor(token,user) {
        this.data = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `${Helpers.apiUrl}withdrawals`,
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
                    width: 70
                }, {
                    field: "method",
                    title: "Cash out option",
                    width: 100
                }, {
                    field: "value",
                    width: 300,
                    title: "Name/email/number",
                    template: function(row){
                        if(row.method == 'Gcash'){
                            return row.value.phone;
                        }else if(row.method == 'Palawan'){
                            return row.value.name + "/\n"+ row.value.address + "/\n"+ row.value.phone;
                        }else{
                            return row.value.email + "/\n"+ row.value.walletAddress+"/\n"+row.value.phone;
                        }
                    }
                }, {
                    field: "status",
                    title: "Status",
                    width: 150
                }
            ]
        }
    }

}