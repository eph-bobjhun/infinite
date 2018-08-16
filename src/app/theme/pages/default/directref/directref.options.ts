import { Helpers } from '../../../../helpers'

export class DirectRefOptions {

    data: any;

    constructor(token,data) {
        this.data = {
            data: {
                type: 'local',
                source: data,
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
                    field: 'order',
                    title: '#',
                    sortable: false, // disable sort for this column
                    width: 40,
                    textAlign: 'center'
                }, {
                    field: "dr",
                    title: "Direct Referral",
                    template: function(row){
                        let fname ='';
                        let lname = '';
                        if(row.dr){
                            fname = row.dr.firstName;
                            lname = row.dr.lastName;
                        }
                        return fname +' '+ lname;
                    }
                },{
                    field: "email",
                    title: "Email",
                    template: function(row){
                        return row.dr.email;
                    }
                }
            ]
        }
    }

}