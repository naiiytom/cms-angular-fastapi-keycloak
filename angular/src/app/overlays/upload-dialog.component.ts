import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-upload-dilog',
    templateUrl: 'upload-dialog.component.html',
    styleUrls: ['upload-dialog.component.scss'],
})

export class UploadDialogComponent {

    @Input() title: string;
    @Input() success: number;
    @Input() failure: number;

    constructor(
        protected ref: NbDialogRef<UploadDialogComponent>,
    ) { }

    dismiss() {
        this.ref.close();
        window.location.reload();
    }
}
