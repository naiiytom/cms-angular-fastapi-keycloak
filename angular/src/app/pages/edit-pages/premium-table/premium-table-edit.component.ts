import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/services/httpClient.service';
import { ExportData, IServerResponse } from 'app/types';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { getPremiumTableHeader } from '../../upload-pages/premium-table/premium-table-header';

@Component({
  selector: 'ngx-premium-table-edit',
  templateUrl: './premium-table-edit.component.html',
  styleUrls: ['./premium-table-edit.component.scss', '../edit-pages.component.scss'],
})
export class PremiumTableEditComponent implements OnInit {
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
  settings = {};

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
    // console.log(`Post Template: ${ this.selectedType }`);
    // const fileName = `template_${ this.selectedType }_latest.csv`;
    this.http.sendGetPremiumTableTemplateByPackageName(this.selectedType)
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
    this.router.navigateByUrl('/pages/upload/insurance-premium-table', {
      skipLocationChange: true,
      state: state,
    });
  }

  async viewDataTable() {
    this.dataLoading = true;
    this.tableVisibility = false;
    this.settings = Object.assign({}, getPremiumTableHeader(this.selectedType));
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
    await this.http.sendGetPremiumTableByPackageName(100, 0, this.selectedType)
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
}
