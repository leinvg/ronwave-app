import { Component } from '@angular/core';
import { GoogleBooksService } from '../../services/google-books.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-books',
  imports: [ReactiveFormsModule],
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css',
})
export class SearchBooksComponent {
  query = new FormControl('');
  books: any[] = [];

  constructor(private booksService: GoogleBooksService) {}

  onSearch() {
    const queryValue = this.query.value;
    if (queryValue && queryValue.length > 2) {
      this.booksService.searchBooks(queryValue).subscribe((response) => {
        this.books = response.items || [];
      });
    }
  }

  selectBook(book: any): void {
    console.log('Libro seleccionado:', book);
  }

  imWriting() {
    console.log(this.query);
  }
}
