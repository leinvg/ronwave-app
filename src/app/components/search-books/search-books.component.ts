import { Component, HostListener } from '@angular/core';
import { GoogleBooksService } from '../../services/google-books.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search-books',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css',
})
export class SearchBooksComponent {
  query = new FormControl('');
  bookList: any[] = [];
  maxDropdownHeight: number = 88;
  isDropdownOpen = false;

  constructor(private booksService: GoogleBooksService) {}

  @HostListener('window:resize')
  calculateDropdownHeight() {
    const windowHeight = window.innerHeight;
    const inputBottom =
      document.getElementById('SearchBar')?.getBoundingClientRect().bottom || 0;
    this.maxDropdownHeight = Math.max(88, windowHeight - inputBottom - 8 - 64);
  }

  onFocus() {
    this.calculateDropdownHeight();
    this.isDropdownOpen = true;
  }

  onBlur() {
    this.isDropdownOpen = false;
  }

  onSearch() {
    const queryValue = this.query.value;
    if (queryValue && queryValue.length > 2) {
      this.booksService.searchBooks(queryValue).subscribe((response) => {
        // this.bookList = response.items || [];
        this.bookList = (response.items || []).filter(
          (item: any) => item.volumeInfo.imageLinks?.thumbnail
        );
      });
    } else {
      this.bookList = [];
    }
  }

  selectBook(book: any) {
    console.log('Libro seleccionado:', book);
  }
}
