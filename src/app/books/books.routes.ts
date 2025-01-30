import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailsComponent } from './pages/book-details.component';
import { BooksStatsComponent } from './pages/books-stats.component';
import { BooksListComponent } from './pages/books-list.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: BooksListComponent,
      },
      {
        path: 'stats',
        component: BooksStatsComponent,
      },
      {
        path: 'details',
        component: BookDetailsComponent,
      },
    ],
  },
];
