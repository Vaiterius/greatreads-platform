import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewReview } from '../../../shared/interfaces/review';
import { environment } from '../../../../environments/environment.development';

@Component({
	selector: 'app-create-review-form',
	standalone: true,
	imports: [],
	templateUrl: './create-review-form.component.html',
	styleUrl: './create-review-form.component.scss',
})
export class CreateReviewFormComponent implements OnInit {
	// TODO have "Write A Review" button redirect to book details page with opened component.
	public form!: FormGroup;
	public review?: NewReview;

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(''),
			body: new FormControl(''),
			rating: new FormControl(null),
		});
		// Get bookURL.
	}

	onSubmit() {
		// this.review = {
		// 	title: this.form.controls['title'].value,
		// 	body: this.form.controls['body'].value,
		// 	rating: +this.form.controls['rating'].value,
		// 	// imageUrl
		// }
		// var url = environment.baseUrl + 'api/Reviews/' + re;
	}
}
