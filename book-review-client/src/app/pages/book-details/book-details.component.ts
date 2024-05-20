import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';

import { GoogleBooksApiService } from '../../shared/services/google-books-api.service';
import { Book, BookDetailsResponse } from '../../shared/interfaces/book';
import { Review } from '../../shared/interfaces/review';
import { environment } from '../../../environments/environment.development';
import { ReviewListItemComponent } from '../../shared/components/review-list-item/review-list-item.component';

@Component({
	selector: 'app-book-details',
	standalone: true,
	imports: [ButtonModule, RouterLink, ReviewListItemComponent],
	templateUrl: './book-details.component.html',
	styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
	public id: string;
	public bookDetails!: Book;
	public bookReviews!: Review[];

	private url: string = environment.baseUrl + 'api/Reviews';

	constructor(
		private route: ActivatedRoute,
		private googleBooksService: GoogleBooksApiService,
		private http: HttpClient,
	) {
		this.id = this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit() {
		this.getBookResponse();
		this.getReviewsFromBook(this.id);
	}

	// Fetching book details.
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

	// Fetching all reviews under this particular book.
	public getReviewsFromBook(id: string) {
		var params = new HttpParams().set('bookId', this.id);
		this.http.get<any>(this.url, { params }).subscribe({
			next: (result) => {
				this.bookReviews = result.data;
			},
			error: (error) => console.error(error),
		});
	}
}
