import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { Book, IsbnInfo } from '../../shared/interfaces/book';
import { GoogleBooksApiService } from '../../shared/services/google-books-api.service';

@Component({
	selector: 'app-book-search',
	standalone: true,
	imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
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
				let totalItems: number = results.totalItems;

				// Rework raw JSON data into formatted Book result item.
				this.searchResults = results.items.map((item: any) => {
					let isbnInfo: IsbnInfo =
						this.googleBooksService.getIsbnIdentifiers(
							item.volumeInfo.industryIdentifiers,
						);
					let formattedResult: Book = {
						id: item.id,
						previewLink: item.volumeInfo.previewLink,
						title: item.volumeInfo.title,
						authors: item.volumeInfo.authors,
						textSnippet: item.searchInfo
							? item.searchInfo.textSnippet
							: 'N/A',
						isbn_10: isbnInfo['isbn_10'] || 'N/A',
						isbn_13: isbnInfo['isbn_13'] || 'N/A',
						other_id: isbnInfo['other'] || 'N/A',
					};
					return formattedResult;
				});
			},
			error: (error) => console.error(error),
		});
	}
}
