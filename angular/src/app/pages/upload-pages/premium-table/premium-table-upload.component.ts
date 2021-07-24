import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UploadDialogComponent } from 'app/overlays/upload-dialog.component';
import { HttpClientService } from 'app/services/httpClient.service';
import { UserService } from 'app/services/user.service';
import { getPremiumTableHeader } from './premium-table-header';
import { UploadResponse } from 'app/types';

@Component({
  selector: 'ngx-premium-table-upload',
  templateUrl: './premium-table-upload.component.html',
  styleUrls: ['./premium-table-upload.component.scss', '../upload-pages.component.scss'],
})
export class PremiumTableUploadComponent implements OnInit {

  data: any[];
  filename: string;
  package_name: string;
  pageLoading: boolean = false;
  loadingMessage: string = '';
  settings = {};
  protected routedData: any;
  protected success: number = 0;
  protected failure: number = 0;

  constructor(
    private router: Router,
    private http: HttpClientService,
    private toastr: NbToastrService,
    private dialog: NbDialogService,
    private user: UserService,
  ) {
    this.routedData = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.data = this.routedData.data;
    this.filename = this.routedData.filename;
    this.package_name = this.routedData.package_name;
    delete this.routedData;
    this.settings = Object.assign({}, getPremiumTableHeader(this.package_name));
  }

  showDialog() {
    this.dialog.open(UploadDialogComponent, {
      context: {
        title: 'Upload Status',
        success: this.success,
        failure: this.failure,
      },
      hasBackdrop: true,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      autoFocus: true,
    });
  }

  showToast(uploadStatus, statusText, position, status) {
    this.toastr.show(
      status || 'Success',
      `Notice: ${ statusText } ${ uploadStatus }`,
      {
        limit: 4,
        position: position,
        status: status,
      });
  }

  uploadFile(): void {
    this.loadingMessage = 'Uploading';
    this.pageLoading = true;
    // this.postSendData(this.user.getUsername(), this.package_name, this.data);
    this.data.forEach(element => {
      this.postSendData(this.user.getUsername(), this.package_name, element);
    });
    setTimeout(() => {
      this.backupHistoryRecall(this.user.getUsername(), 'premium', this.package_name);
    }, 1300);
    setTimeout(() => {
      this.loadingMessage = '';
      this.pageLoading = false;
      this.showDialog();
    }, 1300);
  }

  backupHistoryRecall(username, type, package_name) {
    const body = JSON.stringify({
      'username': username,
      'package_name': package_name,
      'type': type,
    });
    this.http.sendPostEditHistory(body)
      .then(() => {
        // tslint:disable-next-line: no-console
        // console.log('Done');
      });
  }

  postSendData(user, package_name, data) {
    const body = JSON.stringify({
      'package_name': package_name,
      'update_by': user,
      'data': [data],
    });
    // tslint:disable-next-line: no-console
    // console.log('Post body to send', body);
    this.http.sendPostPremiumTableData(body).then(
      (resp: UploadResponse) => {
        // tslint:disable-next-line: no-console
        // console.log('data return', resp);
        if (resp.status === 'success') {
          this.success += 1;
          this.showToast(this.success, 'Succes', 'top-right', 'success');
        } else if (resp.status === 'fail') {
          this.failure += 1;
          this.showToast(this.failure, resp.message, 'top-right', 'warning');
        }
      },
      err => {
        this.failure += 1;
        this.showToast(this.failure, 'Failure', 'top-right', 'warning');
        // tslint:disable-next-line: no-console
        console.log('Error: ', err);
      },
    );
  }

  onDeleteConfirm($event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      $event.confirm.resolve();
      // console.log('data', this.data);
    } else {
      $event.confirm.reject();
    }
  }

  onResetConfirm($event): void {
    if (window.confirm('Are you sure you want to cancel?')) {
      this.loadingMessage = 'Reloading';
      this.pageLoading = true;
      setTimeout(() => {
        this.pageLoading = false;
        window.location.reload();
      }, 1000);
    } else {
      $event.confirm.reject();
    }
  }
}
