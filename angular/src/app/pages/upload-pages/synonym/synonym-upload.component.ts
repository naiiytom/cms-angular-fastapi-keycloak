import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UserService } from 'app/services/user.service';
import { UploadDialogComponent } from '../../../overlays/upload-dialog.component';
import { HttpClientService } from '../../../services/httpClient.service';

@Component({
    selector: 'ngx-synonym-upload',
    templateUrl: 'synonym-upload.component.html',
    styleUrls: ['synonym-upload.component.scss'],
})

export class SynonymUploadComponent implements OnInit {

    data: any[];
    filename: string;
    pageLoading: boolean = false;
    loadingMessage: string = '';
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
        // console.log(this.routedData);
    }

    ngOnInit() {
        this.data = this.routedData.data;
        this.filename = this.routedData.filename;
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
            this.postSendData(element);
        });
        setTimeout(() => {
            this.loadingMessage = '';
            this.pageLoading = false;
            this.showDialog();
        }, 1300);
    }

    postSendData(data) {
        const body = JSON.stringify({
            'data': [data],
        });
        // tslint:disable-next-line: no-console
        // console.log('Post body to send', body);
        this.http.sendPostEditSynonym(body).then(
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
            word: {
                title: 'Word',
                type: 'string',
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
