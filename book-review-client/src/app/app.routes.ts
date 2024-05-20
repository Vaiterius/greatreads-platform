import { Routes } from '@angular/router';

import { GlobalFeedComponent } from './pages/global-feed/global-feed.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { BookSearchComponent } from './pages/book-search/book-search.component';
import { EditReviewFormComponent } from './pages/forms/edit-review-form/edit-review-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { CreateReviewFormComponent } from './pages/forms/create-review-form/create-review-form.component';
import { LoginFormComponent } from './pages/forms/login-form/login-form.component';

export const routes: Routes = [
	// Pages.
	{ path: '', component: UserHomeComponent, pathMatch: 'full' },
	{ path: 'reviews', component: GlobalFeedComponent },
	{ path: 'search-books', component: BookSearchComponent },
	{ path: 'books/:id', component: BookDetailsComponent },
	{ path: 'profile', component: UserProfileComponent },

	// Forms.
	{
		path: 'books/:book-id/reviews/:id/edit-review',
		component: EditReviewFormComponent,
	},
	{
		path: 'books/:book-id/create-review',
		component: CreateReviewFormComponent,
	},
	{
		path: 'login',
		component: LoginFormComponent,
	},
];
