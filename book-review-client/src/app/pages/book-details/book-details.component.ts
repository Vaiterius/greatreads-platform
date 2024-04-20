import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from '../../shared/services/google-books-api.service';
import { Book, BookDetailsResponse } from '../../shared/interfaces/book';

@Component({
	selector: 'app-book-details',
	standalone: true,
	imports: [],
	templateUrl: './book-details.component.html',
	styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
	public id: string;
	public bookDetails!: Book;

	constructor(
		private route: ActivatedRoute,
		private googleBooksService: GoogleBooksApiService,
	) {
		this.id = this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit() {
		this.getBookResponse();
	}

	public getBookResponse() {
		this.googleBooksService.getBookById(this.id).subscribe({
			next: (bookResponse: BookDetailsResponse) => {
				console.log(bookResponse);
				this.bookDetails =
					this.googleBooksService.getFormattedBookFromResponse(
						bookResponse,
					);
			},
			error: (error) => console.error(error),
		});
	}
}
