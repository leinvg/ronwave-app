import { Component } from '@angular/core';
import { GoogleBooksService } from '../../services/google-books.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-books',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css',
})
export class SearchBooksComponent {
  query: string = '';
  books: any[] = [];

  constructor(private booksService: GoogleBooksService) {}

  onSearch() {
    if (this.query.length > 2) {
      this.booksService.searchBooks(this.query).subscribe((response) => {
        this.books = response.items || [];
      });
    }
  }

  selectBook(book: any): void {
    console.log('Libro seleccionado:', book);
  }

  imWriting() {
    console.log('dot' + this.query);
  }
}
