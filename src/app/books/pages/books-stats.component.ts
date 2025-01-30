import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from '@angular/core';
import { BookEntity } from '../types/BookEntity';
import { BooksApiResponse } from '../types/BooksApiResponse';
import { BookStore } from '../services/books.store';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `<div class="stats shadow flex justify-center">
    <div class="stat">
      <div class="stat-value">{{ numberOfBooks() | number }}</div>
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
    <div class="stat">
      <div class="stat-value">{{ averageNumberOfPages() | number }}</div>
      <div class="stat-title text-amber-300">Average # of Pages</div>
    </div>
  </div>`,
  styles: ``,
})
export class BooksStatsComponent {
  store = inject(BookStore);
  books = this.store.books;
  numberOfBooks = computed(() => this.books()?.length || 0);
  earliestYearPublished = computed(
    () =>
      this.books()
        ?.slice()
        .sort((a, b) => a.year - b.year)?.[0].year,
  );
  latestYearPublished = computed(
    () =>
      this.books()
        ?.slice()
        .sort((a, b) => b.year - a.year)?.[0].year,
  );
  averageNumberOfPages = computed(() =>
    Math.round(
      (this.books()?.reduce((acc, cur, i) => (acc += cur.year), 0) || 0) /
        this.numberOfBooks(),
    ),
  );
}
