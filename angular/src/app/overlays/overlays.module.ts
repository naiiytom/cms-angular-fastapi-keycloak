import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbDialogModule } from '@nebular/theme';
import { UploadDialogComponent } from './upload-dialog.component';

@NgModule({
    imports: [
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbDialogModule,
        ThemeModule,
    ],
    declarations: [
        UploadDialogComponent,
    ],
})
export class OverlayModule { }
