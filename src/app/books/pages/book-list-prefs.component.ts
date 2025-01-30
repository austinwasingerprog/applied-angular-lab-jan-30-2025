import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
} from '@angular/core';
import { BookStore } from '../services/books.store';

@Component({
  selector: 'app-book-list-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card card-compact bg-neutral shadow-xl">
      <div class="card-body">
        <h2 class="card-title italic text-white">Preferences</h2>
        <table class="table table-fixed">
          <thead>
            <tr>
              <th>Setting</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-white">Sort Direction</td>
              <td class="text-secondary">{{ textSortDir() }}</td>
              <td>
                <button
                  class="btn btn-outline"
                  id="sortDirButton"
                  (click)="toggleSortDir()"
                >
                  Toggle
                </button>
              </td>
            </tr>
            <tr>
              <td class="text-white">Sort Property</td>
              <td class="text-secondary">{{ textSortProp() }}</td>
              <td>
                <button
                  class="btn btn-outline"
                  id="sortDirButton"
                  (click)="toggleSortProp()"
                >
                  Toggle
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class BookListPrefsComponent {
  store = inject(BookStore);
  textSortDir = computed(() =>
    this.store.sortDir() === 'asc' ? 'Ascending' : 'Descending',
  );
  textSortProp = computed(() => {
    const dictionary: Record<string, string> = {
      title: 'Title',
      author: 'Author',
      year: 'Year',
    };
    return dictionary[this.store.sortProp()];
  });

  toggleSortDir() {
    this.store.toggleSortDirection();
  }

  toggleSortProp() {
    this.store.toggleSortProp();
  }
}
