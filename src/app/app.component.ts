import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { BookCardComponent } from './components/book-card/book-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBooksComponent, BookCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ronwave-app';
  bookList: any[] = [];

  updateBookList(updatedList: any[]) {
    this.bookList = updatedList;
    console.log('Lista de libros actualizada:', this.bookList);
  }
}
