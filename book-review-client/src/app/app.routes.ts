import { Routes } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeComponent } from './home/home.component';
import { ReviewEditComponent } from './reviews/forms/review-edit/review-edit.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'reviews', component: ReviewsComponent },
	{ path: 'reviews/:id', component: ReviewEditComponent },
];
