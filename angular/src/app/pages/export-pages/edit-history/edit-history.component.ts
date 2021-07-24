import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'app/services/httpClient.service';
import { ExportData, IExportTypes, IServerResponse } from 'app/types';

@Component({
  selector: 'ngx-export-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss'],
})
export class EditHistoryComponent implements OnInit {
  constructor(
    private http: HttpClientService,
  ) { }

  rows: IExportTypes[] = [];
  tableVisibility: boolean = false;
  tableLoading: boolean = false;

  ngOnInit() {
    this.tableLoading = true;
    this.tableVisibility = false;
    this.http.sendGetEditHistory(10000, 0)
      .then((data: IServerResponse) => {
        // tslint:disable-next-line: no-console
        // console.log('data', data);
        data.hits.hits.forEach(element => {
          this.rows.push(element._source);
        });
      });
    // tslint:disable-next-line: no-console
    // console.log(this.rows);
    setTimeout(() => {
      this.tableLoading = false;
      this.tableVisibility = true;
    }, 1000);
  }

  settings = {
    columns: {
      document_name: {
        title: 'Document Name',
        type: 'string',
      },
      edited_date: {
        title: 'Edited Date',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      package_name: {
        title: 'Package Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'number',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'export',
          title: '<i class="nb-compose"></i>',
        },
      ],
    },
  };

  onCustomAction($event) {
    // tslint:disable-next-line: no-console
    // console.log($event);
    const fileName = $event.data.document_name;
    this.http.sendGetExportHistory(fileName)
      .then((resp: ExportData) => {
        const url = resp.url;
        // tslint:disable-next-line: no-console
        // console.log(url);
        window.open(url);
      });
  }
}
