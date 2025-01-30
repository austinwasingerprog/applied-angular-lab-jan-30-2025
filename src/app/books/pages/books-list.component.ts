import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookStore } from '../services/books.store';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      @for (book of books(); track $index) {
        <div class="card card-compact bg-neutral shadow-xl">
          <div class="card-body">
            <h2 class="card-title italic text-white">{{ book.title }}</h2>
            <table class="border-separate">
              <tbody>
                <tr>
                  <th class="th">ID</th>
                  <td>{{ book.id }}</td>
                </tr>
                <tr>
                  <th class="th">Author</th>
                  <td>{{ book.author }}</td>
                </tr>
                <tr>
                  <th class="th">Year</th>
                  <td>{{ book.year }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    th {
      @apply bg-accent;
      width: 20%;
      min-width: 75px;
    }

    th,
    td {
      @apply border border-accent text-white p-1;
    }
  `,
})
export class BooksListComponent {
  store = inject(BookStore);
  books = this.store.books;
}
