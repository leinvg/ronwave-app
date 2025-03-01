import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { GoogleBooksService } from '../../services/google-books.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgStyle } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-search-books',
  imports: [ReactiveFormsModule, DatePipe, NgStyle, DragDropModule],
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css',
})
export class SearchBooksComponent {
  @Output() selectedBookUpdated = new EventEmitter<any>();
  selectedBook: any = null;

  query = new FormControl('');
  bookList: any[] = [];
  maxDropdownHeight: number = 88;
  isDropdownOpen = false;

  constructor(private booksService: GoogleBooksService) {}

  @HostListener('window:resize')
  calculateDropdownHeight() {
    const inputBottom =
      document.getElementById('SearchBar')?.getBoundingClientRect().bottom || 0;
    this.maxDropdownHeight = Math.max(
      88,
      window.innerHeight - inputBottom - 72
    );
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const elements = ['SearchBar', 'Dropdown'].map((id) =>
      document.getElementById(id)
    );
    if (elements.every((el) => el && !el.contains(event.target as Node))) {
      this.isDropdownOpen = false;
    }
  }

  openDropdown() {
    if (this.query.value && !this.isDropdownOpen) {
      this.calculateDropdownHeight();
      this.isDropdownOpen = true;
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onSearch() {
    const queryValue = this.query.value;
    if (queryValue) {
      if (!this.isDropdownOpen) {
        this.calculateDropdownHeight();
        this.isDropdownOpen = true;
      }
      if (queryValue.length > 2) {
        this.booksService.searchBooks(queryValue).subscribe((response) => {
          this.bookList = (response.items || []).filter(
            (item: any) =>
              item.volumeInfo.imageLinks?.thumbnail &&
              item.volumeInfo.authors?.length > 0 &&
              item.volumeInfo.publishedDate
          );
        });
      }
    } else {
      this.bookList = [];
    }
  }

  selectBook(book: any) {
    console.log('Libro:', book);
    this.selectedBook = book;
    this.selectedBookUpdated.emit(this.selectedBook);
    this.isDropdownOpen = false;
  }
}
