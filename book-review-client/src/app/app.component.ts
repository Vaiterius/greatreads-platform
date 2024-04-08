import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NavMenuComponent } from './nav-menu/nav-menu.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		HttpClientModule,
		ReactiveFormsModule,
		NavMenuComponent,
	],
})
export class AppComponent {
	title = 'book-review-client';
}
