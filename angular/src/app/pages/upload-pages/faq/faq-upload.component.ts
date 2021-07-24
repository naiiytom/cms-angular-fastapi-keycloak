import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UploadDialogComponent } from '../../../overlays/upload-dialog.component';
import { IFaqTypes, IUploadRoutedData } from '../../../types';
import { HttpClientService } from '../../../services/httpClient.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'ngx-faq-upload',
  templateUrl: 'faq-upload.component.html',
  styleUrls: ['faq-upload.component.scss'],
})

export class FaqUploadComponent implements OnInit {

  data: IFaqTypes[];
  filename: string;
  package_name: string;
  pageLoading: boolean = false;
  loadingMessage: string = '';
  protected routedData: IUploadRoutedData;
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
    // console.log(this.routedData);
  }

  ngOnInit() {
    this.data = this.routedData.data;
    this.filename = this.routedData.filename;
    this.package_name = this.routedData.package_name;
    delete this.routedData;
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
    this.data.forEach(element => {
      this.postSendData(this.user.getUsername(), this.package_name, element);
    });
    setTimeout(() => {
      this.backupHistoryRecall(this.user.getUsername(), 'faq', this.package_name);
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
    this.http.sendPostFaqData(body).then(
      (resp) => {
        // tslint:disable-next-line: no-console
        // console.log('data return', resp);
        if (resp[0] === 'success') {
          this.success += 1;
          this.showToast(this.success, 'Success', 'top-right', 'success');
        } else if (resp[0] === 'fail') {
          this.failure += 1;
          this.showToast(this.failure, 'Failure', 'top-right', 'warning');
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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };
}
