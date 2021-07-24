import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../services/httpClient.service';
import { IFaqTypes, IServerResponse } from '../../../types';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'ngx-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.scss', '../edit-pages.component.scss'],
})

export class FaqEditComponent implements OnInit {
  constructor(
    private http: HttpClientService,
    private csvParser: NgxCsvParser,
    private router: Router,
    private user: UserService,
  ) { }

  data: IFaqTypes[];
  rows: IFaqTypes[] = [];
  insuranceTypes: any[];
  tableVisibility: boolean = false;
  tableLoading: boolean = false;
  filename: string;
  selectedType: string = 'Elite_health';
  editing = {};

  ngOnInit() {
    this.http.sendGetFaqPackageNames().then((data: any[]) => {
      this.insuranceTypes = data;
    });
  }

  selectInsuranceType($event) {
    // tslint:disable-next-line: no-console
    // console.log($event);
    this.selectedType = $event;
    this.emptyData();
    this.tableVisibility = false;
  }

  prepareFile(file) {
    // tslint:disable-next-line: no-console
    // console.log(file);
    this.readFile(file[0]);
  }

  readFile(file) {
    this.csvParser.parse(file, { header: true, delimiter: ',' })
      .pipe()
      .subscribe((result: Array<IFaqTypes>) => {
        this.data = result;
        const date = new Date(Date.now());
        this.data.forEach(element => {
          element.modified_date = date;
        });
        // tslint:disable-next-line: no-console
        // console.log('Data', this.data);
        this.routeUploadPage(file.name, this.selectedType, this.data);
      }, (error: NgxCSVParserError) => {
        // tslint:disable-next-line: no-console
        // console.log('Error', error);
      });
  }

  routeUploadPage(filename, package_name, data) {
    const state = {
      filename: filename,
      package_name: package_name,
      data: data,
    };
    this.router.navigateByUrl('/pages/upload/faq',
      {
        skipLocationChange: true,
        state: state,
      });
  }

  async viewDataTable() {
    this.tableLoading = true;
    this.tableVisibility = false;
    this.emptyData();
    await this.getDataTable(this.selectedType);
    setTimeout(() => {
      this.tableLoading = false;
      this.tableVisibility = true;
    }, 1500);
  }

  async getDataTable(package_name) {
    await this.http.sendGetFaqDataByPackageName(100, 0, package_name)
      .then((data: IServerResponse) => {
        // console.log('Data', data.hits.hits);
        data.hits.hits.forEach(element => {
          this.rows.push(element._source);
        });
      });
    // console.log('Rows', this.rows);
  }

  onCreateConfirm($event) {
    if (window.confirm('Are you sure you want to create?')) {
      // tslint:disable-next-line: no-console
      // console.log($event);
      $event.newData.modified_date = new Date(Date.now());
      const body = JSON.stringify({
        'package_name': this.selectedType,
        'update_by': this.user.getUsername(),
        'data': [$event.newData],
      });
      this.http.sendPostFaqData(body).then(
        (resp) => {
          // tslint:disable-next-line: no-console
          // console.log(resp);
          $event.confirm.resolve($event.newData);
        }, (err) => {
          // tslint:disable-next-line: no-console
          console.log(err);
        });
      // tslint:disable-next-line: no-console
      // console.log($event.newData);
      // tslint:disable-next-line: no-console
      // console.log(body);
      // $event.confirm.resolve($event.newData);
    } else {
      $event.confirm.reject();
    }
  }

  onDeleteConfirm($event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.http.sendGetDeleteFAQByIDAndPackage($event.data.id, $event.data.package_type).then(
        (resp) => {
          // handle success
          // console.log(resp);
        }, (error) => {
          // handle error
        });
      $event.confirm.resolve();
    } else {
      $event.confirm.reject();
    }
  }

  onEditConfirm($event) {
    if (window.confirm('Are you sure you want to save?')) {
      // call to remote api, remember that you have to await this
      $event.newData.updated_by=this.user.getUsername()
      this.http.editFAQSpecificRow($event.newData).then(
        (resp) => {
          // handle success
          // console.log(resp.get._source.modified_date);
          $event.newData.modified_date = resp.get._source.modified_date;
          $event.confirm.resolve($event.newData);
        }, (error) => {
          // handle error
        });

    } else {
      $event.confirm.reject();
    }
  }

  emptyData() {
    const length = this.rows.length;
    this.rows.splice(0, length);
  }

  settings = {
    columns: {
      code: {
        title: 'Code',
        editor: {
          type: 'list',
          config: {
            list: [
              { title: 'P', value: 'P' },
              { title: 'C', value: 'C' },
              { title: 'E', value: 'E' },
              { title: 'U', value: 'U' }],
          },
        },
      },
      question: {
        title: 'Question',
        editor: {
          type: 'textarea',
        },
      },
      answer: {
        title: 'Answer',
        editor: {
          type: 'textarea',
        },
      },
      plan_type: {
        title: 'Plan Type',
        editor: {
          type: 'list',
          config: {
            list: [
              { title: 'all', value: 'all' },
              { title: 'plan1', value: 'plan1' },
              { title: 'plan2', value: 'plan2' },
              { title: 'plan3', value: 'plan3' },
              { title: 'plan4', value: 'plan4' }],
          },
        },
      },
      policy_type: {
        title: 'Policy Type',
        type: 'string',
      },
      modified_date: {
        title: 'Last Modified',
        type: 'number',
        editable: false,
      },
    },
    actions: {
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

  };
}
