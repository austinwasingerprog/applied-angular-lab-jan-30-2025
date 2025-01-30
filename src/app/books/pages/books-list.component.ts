import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { BooksApiResponse } from '../types/BooksApiResponse';
import { BookEntity } from '../types/BookEntity';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      @for (book of books.value(); track $index) {
        <div class="card card-compact bg-neutral shadow-xl">
          <figure>
            <!-- <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        /> -->
          </figure>
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
    }

    th,
    td {
      @apply border border-accent text-white p-1;
    }
  `,
})
export class BooksListComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r: BooksApiResponse) => r.data),
  });
}
