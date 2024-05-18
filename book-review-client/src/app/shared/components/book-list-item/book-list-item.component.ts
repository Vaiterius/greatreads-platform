import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-book-list-item',
	standalone: true,
	imports: [DatePipe, RouterLink, ButtonModule],
	templateUrl: './book-list-item.component.html',
	styleUrl: './book-list-item.component.scss',
})
export class BookListItemComponent {
	@Input() id!: string;
	@Input() title!: string;
	@Input() authors!: string[];
	@Input() imageLinks?: {
		smallThumbnail: string;
		thumbnail: string;
	};
	@Input() textSnippet?: string;
	@Input() isbn_10?: string;
	@Input() isbn_13?: string;
	@Input() other_id?: string;
}
