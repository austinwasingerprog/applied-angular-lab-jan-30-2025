import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <div role="tablist" class="tabs tabs-boxed mb-4">
      <a role="tab" class="tab" routerLinkActive="tab-active" routerLink="list"
        >Library</a
      >
      <a role="tab" class="tab" routerLinkActive="tab-active" routerLink="stats"
        >Statistics</a
      >
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {}
