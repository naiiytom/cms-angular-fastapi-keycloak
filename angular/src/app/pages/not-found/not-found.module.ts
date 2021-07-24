import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    imports: [
        NbCardModule,
        ThemeModule,
        NbButtonModule,
    ],
    declarations: [
        NotFoundComponent,
    ],
})
export class NotFoundModule { }
