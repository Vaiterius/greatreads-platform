import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { environment } from '../../../../environments/environment.development';
import { GoogleBooksApiService } from '../../services/google-books-api.service';
import { Book, BookDetailsResponse } from '../../interfaces/book';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-global-review-list-item',
	standalone: true,
	imports: [DatePipe, RouterLink, TagModule, ButtonModule],
	templateUrl: './global-review-list-item.component.html',
	styleUrl: './global-review-list-item.component.scss',
})
export class GlobalReviewListItemComponent implements OnInit {
	@Input() id!: number;
	@Input() title!: string;
	@Input() body!: string;
	// @Input() author: string;
	@Input() createdAt!: string;
	@Input() lastUpdatedAt?: string;
	@Input() bookId!: string;
	@Input() rating!: number;
	@Input() tags!: string[];

	public isLoggedIn: boolean = false;
	public bookDetails!: Book;

	constructor(
		private authService: AuthService,
		private http: HttpClient,
		private router: Router,
		private googleBooksService: GoogleBooksApiService,
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isAuthenticated();
		this.searchBookById(this.bookId);
	}

	private url: string = environment.baseUrl + 'api/Reviews';

	public deleteReview(id: number) {
		this.http.delete<any>(`${this.url}/${id}`).subscribe({
			next: () => {
				console.log(`Review #${id} deleted successfully`);
				this.router.navigate(['/books', this.bookDetails.id]);
			},
			error: (error) => {
				console.error(`Error deleting review #${id}`, error);
			},
		});
	}

	// This will call an API for every review listed in the paginated global feed.
	public searchBookById(bookId: string) {
		this.googleBooksService.getBookById(bookId).subscribe({
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

	// Redirect to reviews under the tag that was clicked on.
	public redirectWithTag(tagName: string) {
		this.router.navigate(['/reviews'], { queryParams: { tag: tagName } });
	}
}
