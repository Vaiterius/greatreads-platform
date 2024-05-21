import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	Router,
	RouterLink,
	RouterLinkActive,
	RouterOutlet,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../interfaces/user-details';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
	private destroySubject = new Subject();
	public isLoggedIn: boolean = false;
	public userDetails?: UserDetails;

	public selfUrl: string = environment.baseUrl + 'api/Account/CurrentUser';

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private router: Router,
	) {
		this.authService.authStatus
			.pipe(takeUntil(this.destroySubject))
			.subscribe((result) => {
				this.isLoggedIn = result;
			});
	}

	ngOnInit(): void {
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

	ngOnDestroy(): void {
		this.destroySubject.next(true);
		this.destroySubject.complete();
	}

	public onLogout(): void {
		this.authService.logout();
		this.router.navigate(['/reviews']);
		window.location.reload(); // Hack.
	}
}
