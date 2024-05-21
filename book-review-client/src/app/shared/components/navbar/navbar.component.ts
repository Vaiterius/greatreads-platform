import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	Router,
	RouterLink,
	RouterLinkActive,
	RouterOutlet,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';

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

	constructor(
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
