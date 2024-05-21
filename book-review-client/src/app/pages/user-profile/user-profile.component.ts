import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserDetails } from '../../shared/interfaces/user-details';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { GlobalReviewListItemComponent } from '../../shared/components/global-review-list-item/global-review-list-item.component';
import { Review } from '../../shared/interfaces/review';

@Component({
	selector: 'app-user-profile',
	standalone: true,
	imports: [RouterLink, GlobalReviewListItemComponent],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
	private destroySubject = new Subject();
	public isLoggedIn: boolean = false;
	public userDetailsUrl: string = environment.baseUrl + 'api/Account/Users';
	public userReviewsUrl: string = environment.baseUrl + 'api/Reviews';

	public profileUsername: string; // From URL.
	public userDetails!: UserDetails;
	public userReviews!: Review[];

	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private authService: AuthService,
	) {
		this.authService.authStatus
			.pipe(takeUntil(this.destroySubject))
			.subscribe((result) => {
				this.isLoggedIn = result;
			});
		this.profileUsername = this.route.snapshot.paramMap.get('username')!;
	}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isAuthenticated();
		this.getUserDetails();
		this.getUserReviews();
	}

	ngOnDestroy(): void {
		this.destroySubject.next(true);
		this.destroySubject.complete();
	}

	public getUserDetails() {
		this.http
			.get<UserDetails>(this.userDetailsUrl + '/' + this.profileUsername)
			.subscribe({
				next: (result) => {
					console.log('Fetched user: ', result);
					this.userDetails = result;
				},
				error: (error) => console.error(error),
			});
	}

	public getUserReviews() {
		var params = new HttpParams().set('user', this.profileUsername);
		this.http.get<any>(this.userReviewsUrl, { params }).subscribe({
			next: (result) => {
				this.userReviews = result.data;
			},
			error: (error) => console.error(error),
		});
	}
}
