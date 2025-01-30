import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject, Signal } from '@angular/core';
import {
  patchState,
  signalStore,
  SignalStoreFeature,
  signalStoreFeature,
  StateSource,
  type,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { BookEntity } from '../types/BookEntity';
import { BooksDataService } from './books.data';

const bookProps = ['title', 'author', 'year'] as const;
export type BookPropType = (typeof bookProps)[number];
export type BookStoreState = {
  sortProp: 'title' | 'author' | 'year';
  sortDir: 'asc' | 'desc';
};
export const BookStore = signalStore(
  withState<BookStoreState>({ sortProp: 'title', sortDir: 'asc' }),
  withEntities({ collection: '_books', entity: type<BookEntity>() }),
  withDevtools('book-store'),
  withComputed((store) => ({
    books: computed(() => {
      if (store.sortProp() === 'year') {
        return sortByYear(store.sortDir(), store._booksEntities());
      }
      if (store.sortProp() == 'author') {
        return sortByAuthor(store.sortDir(), store._booksEntities());
      }
      return sortByTitle(store.sortDir(), store._booksEntities());
    }),
    numberOfBooks: computed(() => store._booksEntities()?.length || 0),
    earliestYearPublished: computed(
      () =>
        store
          ._booksEntities()
          ?.slice()
          .sort((a, b) => a.year - b.year)?.[0].year,
    ),
    latestYearPublished: computed(
      () =>
        store
          ._booksEntities()
          ?.slice()
          .sort((a, b) => b.year - a.year)?.[0].year,
    ),
    averageNumberOfPages: computed(() =>
      Math.round(
        (store._booksEntities()?.reduce((acc, cur) => (acc += cur.year), 0) ||
          0) / store._booksEntities().length,
      ),
    ),
  })),
  withMethods((store) => {
    const service = inject(BooksDataService);
    return {
      toggleSortDirection: () =>
        patchState(store, {
          sortDir: store.sortDir() == 'asc' ? 'desc' : 'asc',
        }),
      toggleSortProp: () => {
        let curSortPropIndex = bookProps.indexOf(store.sortProp()) + 1;
        if (curSortPropIndex >= bookProps.length) curSortPropIndex = 0;
        patchState(store, { sortProp: bookProps[curSortPropIndex] });
      },
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service
              .getBooks()
              .pipe(
                tap((r) =>
                  patchState(store, setEntities(r, { collection: '_books' })),
                ),
              ),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
      const savedState = localStorage.getItem('books-state');
      if (savedState !== null) {
        const state = JSON.parse(savedState) as unknown as BookStoreState;
        patchState(store, state);
      }
      watchState(store, (state) => {
        type BookStoreStateLocalStorage = Pick<
          BookStoreState,
          'sortDir' | 'sortProp'
        >;
        localStorage.setItem(
          'books-state',
          JSON.stringify(state as BookStoreStateLocalStorage),
        );
      });
    },
  }),
);

function sortByYear(sortDir: 'asc' | 'desc', books: BookEntity[]) {
  return books.slice().sort((a, b) => {
    if (sortDir === 'asc') {
      return a.year - b.year;
    }
    return b.year - a.year;
  });
}

function sortByAuthor(sortDir: 'asc' | 'desc', books: BookEntity[]) {
  return books.slice().sort((a, b) => {
    let af = a.author || '';
    let bf = b.author || '';
    if (sortDir === 'asc') {
      return af.localeCompare(bf);
    }
    return bf.localeCompare(af);
  });
}

function sortByTitle(sortDir: 'asc' | 'desc', books: BookEntity[]) {
  return books.slice().sort((a, b) => {
    let af = a.title || '';
    let bf = b.title || '';
    if (sortDir === 'asc') {
      return af.localeCompare(bf);
    }
    return bf.localeCompare(af);
  });
}
