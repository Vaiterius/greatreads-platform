import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment.development';

@Component({
	selector: 'app-review-list-item',
	standalone: true,
	imports: [DatePipe, RouterLink],
	templateUrl: './review-list-item.component.html',
	styleUrl: './review-list-item.component.scss',
})
export class ReviewListItemComponent {
	@Input() id!: number;
	@Input() title!: string;
	@Input() body!: string;
	// @Input() author: string;
	@Input() createdAt!: string;
	@Input() lastUpdatedAt?: string;
	@Input() bookId!: string;
	@Input() rating!: number;
	@Input() tags!: string[];

	constructor(
		private http: HttpClient,
		private router: Router,
	) {}

	private url: string = environment.baseUrl + 'api/Reviews';

	deleteReview(id: number) {
		this.http.delete<any>(`${this.url}/${id}`).subscribe({
			next: () => {
				console.log(`Review #${id} deleted successfully`);
				this.router.navigate(['/reviews']);
			},
			error: (error) => {
				console.error(`Error deleting review #${id}`, error);
			},
		});
	}
}
