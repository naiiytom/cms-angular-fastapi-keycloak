import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPagesComponent } from './edit-pages.component';
import { FaqEditComponent } from './faq/faq-edit.component';
import { KBEditComponent } from './kb/kb-edit.component';
import { SynonymEditComponent } from './synonym/synonym-edit.component';
import { PremiumTableEditComponent } from './premium-table/premium-table-edit.component';
import { DiseaseTableEditComponent } from './disease/disease-table-edit.component';

const routes: Routes = [{
  path: '',
  component: EditPagesComponent,
  children: [
    {
      path: 'faq',
      component: FaqEditComponent,
    },
    {
      path: 'kb',
      component: KBEditComponent,
    },
    {
      path: 'synonym',
      component: SynonymEditComponent,
    },
    {
      path: 'insurance-premium-table',
      component: PremiumTableEditComponent,
    },
    {
      path: 'disease-table',
      component: DiseaseTableEditComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPagesRoutingModule { }

export const routedComponents = [
  EditPagesComponent,
  FaqEditComponent,
  KBEditComponent,
  SynonymEditComponent,
  PremiumTableEditComponent,
  DiseaseTableEditComponent,
];
