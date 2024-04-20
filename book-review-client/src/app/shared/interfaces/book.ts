/**
 * API reference: https://developers.google.com/books/docs/v1/reference/volumes
 */

export interface Book {
	id: string;
	previewLink: string;
	title: string;
	subtitle?: string;
	authors: string[];
	publisher: string;
	publishDate: string;
	description: string;
	pageCount: number;
	imageLinks?: {
		smallThumbnail: string;
		thumbnail: string;
	};
	textSnippet?: string;
	isbn_10: string;
	isbn_13: string;
	other_id?: string;
}

// From raw data.
export interface IndustryIdentifier {
	type: 'ISBN_13' | 'ISBN_10' | 'OTHER';
	identifier: string;
}

// Our custom format.
export type IsbnInfo = { isbn_13?: string; isbn_10?: string; other?: string };

export type BookDetailsResponse = any; // Big JSON data.

export interface BookVolumesResponse {
	kind: string;
	totalItems: number;
	items: BookDetailsResponse[];
}
