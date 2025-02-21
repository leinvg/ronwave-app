import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBooksComponent } from "./components/search-books/search-books.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBooksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ronwave-app';
}
