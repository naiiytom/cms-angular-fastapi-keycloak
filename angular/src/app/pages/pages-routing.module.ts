import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from 'app/services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
    /*   canActivate: [AuthGuard], */
      data: { roles: ['user'] },
      component: DashboardComponent,
    },
    {
      path: 'edit',
     /*  canActivate: [AuthGuard], */
      data: { roles: ['user'] },
      loadChildren: () => import('./edit-pages/edit-pages.module')
        .then(m => m.EditPagesModule),
    },
    {
      path: 'upload',
   /*    canActivate: [AuthGuard], */
      data: { roles: ['user'] },
      loadChildren: () => import('./upload-pages/upload-pages.module')
        .then(m => m.UploadPagesModule),
    },
    {
      path: 'export',
   /*    canActivate: [AuthGuard], */
      data: { roles: ['admin'] },
      loadChildren: () => import('./export-pages/export-pages.module')
        .then(m => m.ExportPagesModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
