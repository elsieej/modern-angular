import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layouts',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: ``,
})
export class PublicLayouts {}
