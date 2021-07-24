import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { ExportPagesComponent } from './export-pages.component';


const routes: Routes = [{
    path: '',
    component: ExportPagesComponent,
    children: [
        {
            path: 'edit-history',
            component: EditHistoryComponent,
        },
        {
            path: 'chat-log',
            component: ChatLogComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExportPagesRoutingModule { }

export const routedComponents = [
    ExportPagesComponent,
];
