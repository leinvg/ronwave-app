import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBooksComponent, BookCardComponent, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ronwave-app';
  book: any = null;
  zIndex: number = -1;

  updateBook(updatedBook: any) {
    this.book = updatedBook;
    this.zIndex = 1;
    console.log('Libro actualizado:', this.book);
  }

  removeBook(valueBook: any) {
    this.book = valueBook;
    this.zIndex = -1;
  }
}
