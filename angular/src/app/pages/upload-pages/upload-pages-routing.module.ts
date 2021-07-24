import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPagesComponent } from './upload-pages.component';
import { FaqUploadComponent } from './faq/faq-upload.component';
import { KBUploadComponent } from './kb/kb-upload.component';
import { SynonymUploadComponent } from './synonym/synonym-upload.component';
import { PremiumTableUploadComponent } from './premium-table/premium-table-upload.component';
import { DiseaseTableUploadComponent } from './disease/disease-table-upload.component';

const routes: Routes = [{
    path: '',
    component: UploadPagesComponent,
    children: [
        {
            path: 'faq',
            component: FaqUploadComponent,
        },
        {
            path: 'kb',
            component: KBUploadComponent,
        },
        {
            path: 'synonym',
            component: SynonymUploadComponent,
        },
        {
            path: 'insurance-premium-table',
            component: PremiumTableUploadComponent,
        },
        {
            path: 'disease-table',
            component: DiseaseTableUploadComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UploadPagesRoutingModule { }

export const routedComponents = [
    UploadPagesComponent,
    FaqUploadComponent,
    KBUploadComponent,
    SynonymUploadComponent,
    PremiumTableUploadComponent,
    DiseaseTableUploadComponent,
];
