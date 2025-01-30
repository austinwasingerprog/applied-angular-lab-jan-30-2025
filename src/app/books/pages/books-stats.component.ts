import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookStore } from '../services/books.store';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `<div class="stats shadow flex justify-center">
    <div class="stat place-items-center">
      <div class="stat-value">{{ store.numberOfBooks() | number }}</div>
      <div class="stat-title text-secondary">Total # of Books</div>
    </div>
    <div class="stat place-items-center">
      <div class="stat-value">{{ store.earliestYearPublished() }}</div>
      <div class="stat-title text-primary">Earliest Year Published</div>
    </div>
    <div class="stat place-items-center">
      <div class="stat-value">{{ store.latestYearPublished() }}</div>
      <div class="stat-title text-accent">Latest Year Published</div>
    </div>
    <div class="stat place-items-center">
      <div class="stat-value">{{ store.averageNumberOfPages() | number }}</div>
      <div class="stat-title text-amber-300">Average # of Pages</div>
    </div>
  </div>`,
  styles: ``,
})
export class BooksStatsComponent {
  store = inject(BookStore);
  books = this.store.books;
}
