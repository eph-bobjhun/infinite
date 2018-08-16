import { Helpers } from '../../../../helpers'

export class GenealogyOptions {

    data: any;
    e: any = [{
        image: 'woman.jpg',
        school: 'University of Alabama',
        name: 'Janice E. Yap',
        grade: '1st year College',
        position: 'Student Leader',

    }, {
        image: '100_12.jpg',
        school: 'Alcom Agricultural and Mechanical',
        name: 'John Denvy',
        grade: '2nd year Senior High',
        position: 'Volunteer',

    }, {
        image: '100_13.jpg',
        school: 'Arkansas Polytechnic College',
        name: 'Elvis Prensiton',
        grade: '1st year College',
        position: 'Volunteer',
    }, {
        image: '100_14.jpg',
        school: 'Yuda Basic Education Department',
        name: 'Kenya Mae Russ',
        grade: '1st year Senior High',
        position: 'Yuda Student',
    }, {
        image: '100_11.jpg',
        school: 'University of Yuta',
        name: 'Leendli Bero',
        grade: '4th year College',
        position: 'Yuda Student',
    }];


    constructor() {
        this.data = {
            data: {
                type: 'local',
                source: this.e,
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
                    field: 'RecordID',
                    title: '#',
                    sortable: false, // disable sort for this column
                    width: 40,
                    textAlign: 'center',
                    selector: { class: 'm-checkbox--solid m-checkbox--brand' },
                }, {
                    field: "image",
                    title: "Student Information",
                    template: function(row) {
                        return '<div class="m-card-user m-card-user--sm">\
                                <div class="m-card-user__pic">\
                                    <img src="/assets/app/media/img/misc/' + row.image + '" class="m--img-rounded m--marginless" alt="photo">\
                                </div>\
                                <div class="m-card-user__details">\
                                    <span class="m-card-user__name">' + row.name + '</span>\
                                </div>\
                            </div>';
                    }
                }, {
                    field: "position",
                    title: "Position",
                }, {
                    field: "grade",
                    title: "Grade",
                }, {
                    field: "school",
                    title: "School",

                }, {
                    field: 'Actions',
                    width: 110,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function(data) {
                        var dropup = (data.getDatatable().getPageSize() -
                            data.getIndex()) <=
                            4 ? 'dropup' : '';

                        return '\
                                <div class="dropdown ' + dropup + '">\
                                    <a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                        <i class="la la-ellipsis-h"></i>\
                                    </a>\
                                      <div class="dropdown-menu dropdown-menu-right">\
                                        <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
                                        <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
                                        <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
                                      </div>\
                                </div>\
                                <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
                                    <i class="la la-edit"></i>\
                                </a>\
                                <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\
                                    <i class="la la-trash"></i>\
                                </a>\
                            ';
                    },
                }
            ]
        }
    }

}