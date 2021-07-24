import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Made with <a style="color:red">♥</a> by <b>AIGEN</b> ©{{anio}}
    </span>
  `,
})
export class FooterComponent {

  anio: number = new Date().getFullYear();

}
