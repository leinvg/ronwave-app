import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeminiApiService } from '../../services/gemini-api.service';

@Component({
  selector: 'app-book-card',
  imports: [DatePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent implements OnInit {
  @Output() removeSelectedBook = new EventEmitter<any>();
  selectedBook: any = null;
  summary: string = 'Generando resumen...';

  @Input() book: any;
  constructor(private geminiService: GeminiApiService) {}

  closeCardBook() {
    console.log('cerrar');
    this.removeSelectedBook.emit(null);
  }

  ngOnInit() {
    if (this.book && this.book.volumeInfo?.description) {
      this.getBookSummary(this.book.volumeInfo.description);
    }
  }

  async getBookSummary(description: string) {
    this.summary = await this.geminiService.getSummary(
      `Resume este texto en 1 oracion: ${description}`
    );
  }
}
