import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

import { LoginRequest } from '../../../shared/interfaces/login-request';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginResult } from '../../../shared/interfaces/login-result';

@Component({
	selector: 'app-login-form',
	standalone: true,
	imports: [
		RouterLink,
		ReactiveFormsModule,
		InputTextModule,
		PasswordModule,
		MessagesModule,
		ButtonModule,
	],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
	public form!: FormGroup;
	public title?: string;
	public loginResult?: LoginResult;

	public errorMessage: Message[] = [
		{
			severity: 'error',
			detail: 'Invalid username or password',
		},
	];

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
		});
	}

	public onSubmit() {
		var loginRequest = <LoginRequest>{};

		loginRequest.email = this.form.controls['username'].value;
		loginRequest.password = this.form.controls['password'].value;

		this.authService.login(loginRequest).subscribe({
			next: (result) => {
				console.log(result);
				this.loginResult = result;
				if (result.success) {
					this.router.navigate(['/']);
				}
			},
			error: (error) => {
				console.log(error);
				if (error.status == 401) {
					console.log(error);
					this.loginResult = error.error;
				}
			},
		});
	}
}
