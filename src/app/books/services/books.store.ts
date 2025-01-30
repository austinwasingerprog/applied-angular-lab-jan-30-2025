import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { BookEntity } from '../types/BookEntity';
import { BooksDataService } from './books.data';

export const BookStore = signalStore(
  withEntities({ collection: '_books', entity: type<BookEntity>() }),
  withDevtools('book-store'),
  withComputed((store) => ({
    books: computed(() => store._booksEntities()),
  })),
  withMethods((store) => {
    const service = inject(BooksDataService);
    return {
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
    },
  }),
);
