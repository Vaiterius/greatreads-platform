import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Message } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';

import { confirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';
import { SignupRequest } from '../../../shared/interfaces/signup-request';
import { AuthService } from '../../../shared/services/auth.service';
import { SignupResult } from '../../../shared/interfaces/signup-result';

@Component({
	selector: 'app-signup-form',
	standalone: true,
	imports: [
		RouterLink,
		ReactiveFormsModule,
		InputTextModule,
		PasswordModule,
		MessagesModule,
		ButtonModule,
	],
	templateUrl: './signup-form.component.html',
	styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
	public form!: FormGroup;
	public signupResult?: SignupResult;

	public errorMessage: Message[] = [
		{
			severity: 'error',
			detail: 'Username already exists',
		},
	];

	constructor(
		private authService: AuthService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.form = new FormGroup(
			{
				firstName: new FormControl('', Validators.required),
				lastName: new FormControl('', Validators.required),
				username: new FormControl('', Validators.required),
				password: new FormControl('', Validators.required),
				passwordConfirm: new FormControl('', Validators.required),
			},
			{
				validators: confirmPasswordValidator,
			},
		);
	}

	public onSubmit() {
		// Validate that passwords match.
		let password: string = this.form.controls['password'].value;
		let passwordConfirm: string =
			this.form.controls['passwordConfirm'].value;
		if (password !== passwordConfirm) {
			console.log('Passwords do not match');
			return;
		}

		var signupRequest = <SignupRequest>{};

		signupRequest.firstName = this.form.controls['firstName'].value;
		signupRequest.lastName = this.form.controls['lastName'].value;
		signupRequest.username = this.form.controls['username'].value;
		signupRequest.password = this.form.controls['password'].value;

		this.authService.signup(signupRequest).subscribe({
			next: (result) => {
				console.log(result);
				this.signupResult = result;
				if (result.success) {
					this.router.navigate(['/']);
				}
			},
			error: (error) => {
				console.log(error);
				if (error.status == 400) {
					console.log(error);
					this.signupResult = error.error;
				}
			},
		});
	}
}
