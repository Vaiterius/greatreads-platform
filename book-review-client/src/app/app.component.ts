import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		HttpClientModule,
		ReactiveFormsModule,
		NavbarComponent,
		MessagesModule,
		MessageModule,
	],
})
export class AppComponent {
	title = 'book-review-client';
}
