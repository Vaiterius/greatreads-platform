import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { AuthService } from './shared/services/auth.service';
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
export class AppComponent implements OnInit {
	title = 'Greatreads';

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.init();
	}
}
