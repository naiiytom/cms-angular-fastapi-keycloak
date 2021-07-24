import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { routedComponents, ExportPagesRoutingModule } from './export-pages-routing.module';


@NgModule({
    imports: [
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbSpinnerModule,
        ThemeModule,
        Ng2SmartTableModule,
        HttpClientModule,
        ExportPagesRoutingModule,
    ],
    declarations: [
        ...routedComponents,
        ChatLogComponent,
        EditHistoryComponent,
    ],
})
export class ExportPagesModule { }
