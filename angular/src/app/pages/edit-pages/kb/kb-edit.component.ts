import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../services/httpClient.service';
import { IKBTypes, IServerResponse } from '../../../types';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'ngx-kb-edit',
  templateUrl: './kb-edit.component.html',
  styleUrls: ['./kb-edit.component.scss', '../edit-pages.component.scss'],
})

export class KBEditComponent implements OnInit {
  constructor(
    private http: HttpClientService,
    private csvParser: NgxCsvParser,
    private router: Router,
  ) { }

  data: IKBTypes[];
  rows: IKBTypes[] = [];
  insuranceTypes: any[];
  tableVisibility: boolean = false;
  tableLoading: boolean = false;
  filename: string;
  selectedType: string = 'Elite_health';
  editing = {};
  ngOnInit() {
    this.http.sendGetKBPackageNames().then((data: any[]) => {
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
      .subscribe((result: Array<IKBTypes>) => {
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
    this.router.navigateByUrl('/pages/upload/kb',
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
    await this.http.sendGetKBDataByPackageName(100, 0, package_name)
      .then((data: IServerResponse) => {
        // console.log('Data', data.hits.hits);
        data.hits.hits.forEach(element => {
          this.rows.push(element._source);
        });
      });
    // console.log('Rows', this.rows)
  }

  onDeleteConfirm($event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      $event.confirm.resolve();
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
      id: {
        title: 'ID',
        type: 'string',
      },
      policy_type: {
        title: 'Policy Type',
        type: 'string',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      text: {
        title: 'Text',
        type: 'string',
      },
      plan1: {
        title: 'Plan1',
        type: 'string',
      },
      plan2: {
        title: 'Plan2',
        type: 'string',
      },
      plan3: {
        title: 'Plan3',
        type: 'string',
      },
      plan4: {
        title: 'Plan4',
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
      add: false,
      delete: false,
      edit: false,
    },
  };
}
