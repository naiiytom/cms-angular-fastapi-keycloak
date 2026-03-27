import { Component } from '@angular/core';

@Component({
  selector: 'ngx-appdum',
  template: `

          <ng-content select="router-outlet"></ng-content>

  `,
})
export class AppDumComponent { 

  constructor(){
    console.log('app componnet loaded')
  }
}
