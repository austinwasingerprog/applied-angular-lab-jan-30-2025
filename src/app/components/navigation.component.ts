import { UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FeatureDirective, RouterLinkActive, UpperCasePipe],
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            @for (link of links(); track link.href) {
              @if (link.feature) {
                <li>
                  <a
                    routerLinkActive="active"
                    *feature="link.feature"
                    [routerLink]="[link.href]"
                    >{{ link.text }}</a
                  >
                </li>
              } @else {
                <li>
                  <a routerLinkActive="active" [routerLink]="[link.href]">{{
                    link.text
                  }}</a>
                </li>
              }
            }
          </ul>
        </div>
        <a class="btn btn-ghost text-xl" routerLink="">Applied Angular</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          @for (link of links(); track link.href) {
            @if (link.feature) {
              <li>
                <a
                  routerLinkActive="active"
                  *feature="link.feature"
                  [routerLink]="[link.href]"
                  >{{ link.text | uppercase }}</a
                >
              </li>
            } @else {
              <li>
                <a routerLinkActive="active" [routerLink]="[link.href]">{{
                  link.text | uppercase
                }}</a>
              </li>
            }
          }
        </ul>
      </div>
      <div class="navbar-end">
        <a
          class="btn"
          href="https://applied-angular.hypertheory.com"
          target="_blank"
          >Site</a
        >
      </div>
    </div>
  `,
  styles: ``,
})
export class NavigationComponent {
  links = signal<{ href: string; text: string; feature?: string }[]>([
    {
      href: 'resources',
      text: 'Resources',
    },
    {
      href: 'demos',
      text: 'Demos',
    },
    {
      href: 'golf',
      text: 'Golf',
      feature: 'golf',
    },
    {
      href: 'jeff-counter',
      text: 'Counter (Jeff)',
    },
    {
      href: 'books',
      text: 'Books',
    },
  ]);
}
