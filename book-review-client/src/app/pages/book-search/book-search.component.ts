import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import {
	Book,
	BookDetailsResponse,
	IsbnInfo,
} from '../../shared/interfaces/book';
import { GoogleBooksApiService } from '../../shared/services/google-books-api.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-book-search',
	standalone: true,
	imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RouterLink],
	templateUrl: './book-search.component.html',
	styleUrl: './book-search.component.scss',
})
export class BookSearchComponent implements OnInit {
	public form!: FormGroup;

	// Null = No search yet. Empty = Search returned no results.
	public searchResults?: Book[];

	constructor(private googleBooksService: GoogleBooksApiService) {}

	ngOnInit() {
		this.form = new FormGroup({
			searchQuery: new FormControl(''),
		});
	}

	searchBooks() {
		var query: string = this.form.controls['searchQuery'].value;
		this.googleBooksService.searchBooksByTitle(query).subscribe({
			next: (results) => {
				// let totalItems: number = results.totalItems;
				this.searchResults = results.items.map(
					(item: BookDetailsResponse) => {
						return this.googleBooksService.getFormattedBookFromResponse(
							item,
						);
					},
				);
			},
			error: (error) => console.error(error),
		});
	}
}
