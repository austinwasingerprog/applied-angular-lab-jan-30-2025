import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';
import { BookEntity } from '../types/BookEntity';
import { BooksApiResponse } from '../types/BooksApiResponse';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="stats shadow flex justify-center">
    <div class="stat">
      <div class="stat-value">{{ numberOfBooks() }}</div>
      <div class="stat-title text-secondary">Total # of Books</div>
    </div>
    <div class="stat">
      <div class="stat-value">{{ earliestYearPublished() }}</div>
      <div class="stat-title text-primary">Earliest Year Published</div>
    </div>
    <div class="stat">
      <div class="stat-value">{{ latestYearPublished() }}</div>
      <div class="stat-title text-accent">Latest Year Published</div>
    </div>
  </div>`,
  styles: ``,
})
export class BooksStatsComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r: BooksApiResponse) => r.data),
  });
  numberOfBooks = computed(() => this.books.value()?.length || 0);
  earliestYearPublished = computed(
    () =>
      this.books
        .value()
        ?.slice()
        .sort((a, b) => a.year - b.year)?.[0].year,
  );
  latestYearPublished = computed(
    () =>
      this.books
        .value()
        ?.slice()
        .sort((a, b) => b.year - a.year)?.[0].year,
  );
}
