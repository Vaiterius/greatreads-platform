import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

export const AuthGuard: CanActivateFn = (
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	const authService: AuthService = inject(AuthService);
	const router: Router = inject(Router);

	if (authService.isAuthenticated()) {
		return true;
	}

	// Redirect to login page.
	return router.createUrlTree(['login'], {
		queryParams: {
			returnUrl: state.url,
		},
	});
};
