import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/services/httpClient.service';
import { ExportData, IServerResponse } from 'app/types';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'ngx-disease-table-edit',
  templateUrl: './disease-table-edit.component.html',
  styleUrls: ['./disease-table-edit.component.scss', '../edit-pages.component.scss'],
})
export class DiseaseTableEditComponent implements OnInit {
  constructor(
    private http: HttpClientService,
    private csvParser: NgxCsvParser,
    private router: Router,
  ) { }

  data: any[];
  rows: any[] = [];
  insuranceTypes: any[];
  tableVisibility: boolean = false;
  selectedType: string = 'Elite_health';
  dataLoading: boolean = false;

  ngOnInit() {
    this.http.sendGetKBPackageNames()
      .then((data: any[]) => {
        this.insuranceTypes = data;
      });
  }

  selectInsuranceType($event) {
    this.selectedType = $event;
    this.emptyData();
    this.tableVisibility = false;
  }

  getTemplate() {
    this.dataLoading = true;
    // tslint:disable-next-line: no-console
    // console.log(`Get Template: ${ this.selectedType }`);
    // const fileName = `template_${ this.selectedType }_latest.csv`;
    this.http.sendGetDiseaseTableTemplateByPackageName(this.selectedType)
      .then((resp: ExportData) => {
        // tslint:disable-next-line: no-console
        // console.log(resp);
        const url = resp.url;
        setTimeout(() => {
          window.open(url);
          this.dataLoading = false;
        }, 1000);
      });
  }

  prepareFile(file) {
    this.readFile(file[0]);
  }

  readFile(file) {
    this.csvParser.parse(file, { header: true, delimiter: ',' })
      .pipe()
      .subscribe((result: any[]) => {
        this.data = result;
        this.routeUploadPage(file.name, this.selectedType, this.data);
      }, (error: NgxCSVParserError) => {
        // tslint:disable-next-line: no-console
        console.log('Error', error);
      });
  }

  routeUploadPage(filename, package_name, data) {
    const state = {
      filename: filename,
      package_name: package_name,
      data: data,
    };
    this.router.navigateByUrl('/pages/upload/disease-table', {
      skipLocationChange: true,
      state: state,
    });
  }

  async viewDataTable() {
    this.dataLoading = true;
    this.tableVisibility = false;
    this.emptyData();
    await this.getDataTable();
    setTimeout(() => {
      this.dataLoading = false;
      this.tableVisibility = true;
    }, 1300);
    // tslint:disable-next-line: no-console
    // console.log(this.rows);
  }

  async getDataTable() {
    await this.http.sendGetDiseaseTableDataByPackageName(100, 0, this.selectedType)
      .then((data: IServerResponse) => {
        // tslint:disable-next-line: no-console
        // console.log(data);
        data.hits.hits.forEach(element => {
          this.rows.push(element._source);
          // tslint:disable-next-line: no-console
          // console.log('data: ', this.rows);
        });
      });
  }

  emptyData() {
    const length = this.rows.length;
    this.rows.splice(0, length);
  }

  settings = {
    columns: {
      code: {
        title: 'Code',
        type: 'string',
      },
      disease: {
        title: 'Disease',
        type: 'string',
      },
      desc: {
        title: 'Desc',
        type: 'string',
      },
      synonym: {
        title: 'Synonym',
        type: 'string',
      },
      post: {
        title: 'Post',
        type: 'string',
      },
      เป็นมาก่อน: {
        title: 'เป็นมาก่อน',
        type: 'string',
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
