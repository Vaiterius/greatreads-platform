import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { LoginResult } from '../interfaces/login-result';
import { environment } from '../../../environments/environment.development';
import { SignupRequest } from '../interfaces/signup-request';
import { SignupResult } from '../interfaces/signup-result';
import { UserDetails } from '../interfaces/user-details';
import { LoginRequest } from '../interfaces/login-request';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private tokenKey: string = 'token';
	private _authStatus = new BehaviorSubject<boolean>(false);
	public authStatus = this._authStatus.asObservable();

	constructor(private http: HttpClient) {}

	public isAuthenticated(): boolean {
		return this.getToken() !== null;
	}

	public getToken(): string | null {
		return localStorage.getItem(this.tokenKey);
	}

	public init() {
		if (this.isAuthenticated()) {
			this.setAuthStatus(true);
		}
	}

	public login(item: LoginRequest): Observable<LoginResult> {
		const url: string = environment.baseUrl + 'api/Account/Login';
		return this.http.post<LoginResult>(url, item).pipe(
			tap((loginResult) => {
				if (loginResult.success && loginResult.token) {
					console.log('Login success!');
					localStorage.setItem(this.tokenKey, loginResult.token);
					this.setAuthStatus(true);
				}
			}),
		);
	}

	public signup(item: SignupRequest): Observable<SignupResult> {
		const url: string = environment.baseUrl + 'api/Account/Signup';
		return this.http.post<SignupResult>(url, item).pipe(
			tap((signupResult) => {
				if (signupResult.success && signupResult.token) {
					console.log('Account creation success!');
					localStorage.setItem(this.tokenKey, signupResult.token);
					this.setAuthStatus(true);
				}
			}),
		);
	}

	public logout() {
		localStorage.removeItem(this.tokenKey);
		this.setAuthStatus(false);
	}

	// WHY DOESN'T THIS WORK HERE BUT WORKS IN THE COMPONENT FILES?!!?!!
	public getUserDetails() {
		const url: string = environment.baseUrl + 'api/Account/CurrentUser';
		return this.http.get<UserDetails>(url);
	}

	private setAuthStatus(isAuthenticated: boolean): void {
		this._authStatus.next(isAuthenticated);
	}
}
