import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private API_URL = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    const url = `${this.API_URL}?q=${query}&maxResults=7`;
    return this.http.get<any>(url);
  }
}
