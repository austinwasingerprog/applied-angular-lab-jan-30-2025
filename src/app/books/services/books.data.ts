import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { BooksApiResponse } from '../types/BooksApiResponse';

export class BooksDataService {
  #client = inject(HttpClient);

  getBooks() {
    return this.#client
      .get<BooksApiResponse>('/api/books')
      .pipe(map((r) => r.data));
  }
}
