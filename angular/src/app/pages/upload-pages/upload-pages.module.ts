import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbDialogModule,
    NbToastrModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { routedComponents, UploadPagesRoutingModule } from './upload-pages-routing.module';

@NgModule({
    imports: [
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbSelectModule,
        NbSpinnerModule,
        NbToastrModule,
        NbProgressBarModule,
        ThemeModule,
        Ng2SmartTableModule,
        HttpClientModule,
        NbDialogModule,
        UploadPagesRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class UploadPagesModule { }
