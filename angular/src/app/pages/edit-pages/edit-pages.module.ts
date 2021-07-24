import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbSelectModule, NbSpinnerModule, NbProgressBarModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { EditPagesRoutingModule, routedComponents } from './edit-pages-routing.module';
@NgModule({
    imports: [
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbSelectModule,
        NbSpinnerModule,
        NbProgressBarModule,
        ThemeModule,
        Ng2SmartTableModule,
        HttpClientModule,
        EditPagesRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class EditPagesModule { }
