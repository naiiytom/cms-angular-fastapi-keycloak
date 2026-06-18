import { Component } from '@angular/core';
import { MENU_ITEMS } from 'app/pages/pages-menu';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start>
        <ng-content select="nb-menu"></ng-content>
         <!--  <nb-menu [items]="menu"></nb-menu> -->
     
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
     <!--      <router-outlet></router-outlet> -->
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
   menu = MENU_ITEMS;
}
