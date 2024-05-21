import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UserDetails } from '../../shared/interfaces/user-details';
import { environment } from '../../../environments/environment.development';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './user-home.component.html',
	styleUrl: './user-home.component.scss',
})
export class UserHomeComponent implements OnInit {
	public users!: UserDetails[];
	public userDetails!: UserDetails;

	public selfUrl: string = environment.baseUrl + 'api/Account/CurrentUser';
	public allUrl: string = environment.baseUrl + 'api/Account/Users';

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		// Moved over from AuthService.
		this.http.get<UserDetails>(this.selfUrl).subscribe({
			next: (result) => {
				console.log('Current user in session: ', result);
				this.userDetails = result;
			},
			error: (error) =>
				console.error('Error on getting current user info: ', error),
		});
		this.getAllUsers();
	}

	public getAllUsers() {
		this.http.get<UserDetails[]>(this.allUrl).subscribe({
			next: (result) => {
				this.users = result;
			},
			error: (error) => console.error(error),
		});
	}
}
