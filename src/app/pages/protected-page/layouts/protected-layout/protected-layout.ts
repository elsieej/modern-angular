import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav-component/nav-component';

@Component({
  selector: 'app-protected-layout',
  imports: [RouterOutlet, NavComponent],
  template: `
    <div class="h-screen w-screen p-4">
      <header>
        <app-nav-component />
      </header>
      <main>
        <router-outlet />
      </main>
      <footer>
      </footer>
    </div>
  `,
  styles: ``,
})
export class ProtectedLayout {}
