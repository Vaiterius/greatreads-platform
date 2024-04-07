import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { environment } from '../../environments/environment';
import { Review } from './review';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [DatePipe],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
	public reviews!: Review[];
	constructor(private http: HttpClient) {}
	ngOnInit() {
		this.http.get<Review[]>(environment.baseUrl + 'api/Reviews').subscribe({
			next: (result) => {
				this.reviews = result;
			},
			error: (error) => console.error(error),
		});
	}
}
