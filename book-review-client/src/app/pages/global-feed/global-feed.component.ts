import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';

import { Review } from '../../shared/interfaces/review';
import { environment } from '../../../environments/environment.development';
import { GlobalReviewListItemComponent } from '../../shared/components/global-review-list-item/global-review-list-item.component';
import { Subject, takeUntil } from 'rxjs';
import { UserDetails } from '../../shared/interfaces/user-details';
import { AuthService } from '../../shared/services/auth.service';

@Component({
	selector: 'app-global-feed',
	standalone: true,
	imports: [
		DatePipe,
		PaginatorModule,
		TagModule,
		RouterLink,
		GlobalReviewListItemComponent,
	],
	templateUrl: './global-feed.component.html',
	styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent implements OnInit {
	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
	) {
		this.authService.authStatus
			.pipe(takeUntil(this.destroySubject))
			.subscribe((result) => {
				this.isLoggedIn = result;
			});
	}

	private reviewsUrl: string = environment.baseUrl + 'api/Reviews';
	private tagsUrl: string = environment.baseUrl + 'api/Tags';
	public tags!: string[];
	public reviews!: Review[];

	public searchTag: string = '';

	private destroySubject = new Subject();
	public isLoggedIn: boolean = false;
	public userDetails?: UserDetails;

	public selfUrl: string = environment.baseUrl + 'api/Account/CurrentUser';

	// Manage paginator state.
	public pageIndex: number = 0;
	public pageSize: number = 10;
	public totalCount!: number;

	ngOnInit() {
		// Force route reload whenever params change.
		// Refer to highest-voted answer: https://stackoverflow.com/questions/38971660/angular-2-reload-route-on-param-change
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;

		var tag = this.activatedRoute.snapshot.queryParamMap.get('tag');
		if (tag) {
			this.searchTag = tag;
		}

		this.getInitialReviews();
		this.getAllTags();

		this.isLoggedIn = this.authService.isAuthenticated();
		if (this.isLoggedIn) {
			this.http.get<UserDetails>(this.selfUrl).subscribe({
				next: (result) => {
					console.log('This was called!');
					this.userDetails = result;
				},
				error: (error) =>
					console.error(
						'Error on getting current user info: ',
						error,
					),
			});
		}
	}

	// For every selection interaction with the paginator.
	public onPageChange(event: any) {
		this.pageIndex = event.page;
		this.pageSize = event.rows;

		var params = new HttpParams()
			.set('pageIndex', event.page.toString())
			.set('pageSize', event.rows.toString())
			.set('tag', this.searchTag);
		this.http.get<any>(this.reviewsUrl, { params }).subscribe({
			next: (result) => {
				this.reviews = result.data;
				this.pageIndex = result.pageIndex;
				this.pageSize = result.pageSize;
			},
			error: (error) => console.error(error),
		});
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// Initial data to view on page landing.
	public getInitialReviews() {
		var params = new HttpParams()
			.set('pageIndex', Number(this.pageIndex).toString())
			.set('pageSize', Number(this.pageSize).toString())
			.set('tag', this.searchTag);
		this.http.get<any>(this.reviewsUrl, { params }).subscribe({
			next: (result) => {
				this.reviews = result.data;
				this.pageIndex = result.pageIndex;
				this.pageSize = result.pageSize;
				this.totalCount = result.totalCount;
			},
			error: (error) => console.error(error),
		});
	}

	// Get all tags to filter by.
	public getAllTags() {
		this.http.get<any>(this.tagsUrl).subscribe({
			next: (result) => {
				this.tags = result;
			},
			error: (error) => console.error(error),
		});
	}
}
