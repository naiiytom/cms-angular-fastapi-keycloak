import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/services/httpClient.service';
import { IServerResponse, ISynonymTypes } from 'app/types';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'ngx-synonym-edit',
  templateUrl: './synonym-edit.component.html',
  styleUrls: ['./synonym-edit.component.scss', '../edit-pages.component.scss'],
})

export class SynonymEditComponent implements OnInit {
  constructor(
    private http: HttpClientService,
    private csvParser: NgxCsvParser,
    private router: Router,
  ) { }
  data: ISynonymTypes[];
  rows: ISynonymTypes[] = [];
  tableVisibility: boolean = false;
  tableLoading: boolean = false;

  ngOnInit() {
    this.viewDataTable();
  }

  prepareFile(file) {
    // tslint:disable-next-line: no-console
    // console.log(file);
    this.readFile(file[0]);
  }

  readFile(file) {
    this.csvParser.parse(file, { header: true, delimiter: ',' })
      .pipe()
      .subscribe((result: Array<ISynonymTypes>) => {
        this.data = result;
        // tslint:disable-next-line: no-console
        // console.log('Data', this.data);
        this.routeUploadPage(file.name, this.data);
      }, (error: NgxCSVParserError) => {
        // tslint:disable-next-line: no-console
        // console.log('Error', error);
      });
  }

  routeUploadPage(filename, data) {
    const state = {
      filename: filename,
      data: data,
    };
    this.router.navigateByUrl('/pages/upload/synonym',
      {
        skipLocationChange: true,
        state: state,
      });
  }

  async viewDataTable() {
    this.tableLoading = true;
    this.tableVisibility = false;
    this.emptyData();
    await this.getDataTable();
    setTimeout(() => {
      this.tableLoading = false;
      this.tableVisibility = true;
    }, 1000);
    // tslint:disable-next-line: no-console
    // console.log(this.rows);
  }

  async getDataTable() {
    await this.http.sendGetSynonymDictionary(100, 0)
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

  onCreateConfirm($event) {
    if (window.confirm('Are you sure you want to create?')) {
      // tslint:disable-next-line: no-console
      // console.log($event);
      this.http.sendGetAddSynonym($event.newData.word, $event.newData.synonym).then(
        (resp) => {
          // tslint:disable-next-line: no-console
          // console.log(resp);
          $event.confirm.resolve($event.newData);
        }, (err) => {
          // tslint:disable-next-line: no-console
          console.log(err);
        });
    } else {
      $event.confirm.reject();
    }
  }

  onDeleteConfirm($event) {
    if (window.confirm('Are you sure you want to delete?')) {
      // tslint:disable-next-line: no-console
      // console.log($event);
      this.http.sendGetDeleteSynonymByWord($event.data.word).then(
        (resp) => {
          // tslint:disable-next-line: no-console
          // console.log(resp);
        }, (err) => {
          // tslint:disable-next-line: no-console
          console.log(err);
        });
      $event.confirm.resolve();
    } else {
      $event.confirm.reject();
    }
  }

  onEditConfirm($event) {
    if (window.confirm('Are you sure you want to save?')) {
      // tslint:disable-next-line: no-console
      // console.log($event);
      // call to remote api, remember that you have to await this
      this.http.sendGetAddSynonym($event.newData.word, $event.newData.synonym).then(
        (resp) => {
          // tslint:disable-next-line: no-console
          // console.log(resp);
          $event.confirm.resolve($event.newData);
        }, (err) => {
          // tslint:disable-next-line: no-console
          console.log(err);
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
      word: {
        title: 'Word',
        type: 'string',
        editable: false,
      },
      synonym: {
        title: 'Synonym',
        type: 'string',
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
