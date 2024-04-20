import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
	Book,
	BookDetailsResponse,
	BookVolumesResponse,
	IndustryIdentifier,
	IsbnInfo,
} from '../interfaces/book';

@Injectable({
	providedIn: 'root',
})
export class GoogleBooksApiService {
	private searchUrl: string = 'https://www.googleapis.com/books/v1/volumes';

	constructor(private http: HttpClient) {}

	// API calls.

	public searchBooksByTitle(query: string) {
		var params = new HttpParams().set('q', `intitle:${query}`);
		return this.http.get<BookVolumesResponse>(this.searchUrl, { params });
	}

	public getBookById(id: string) {
		return this.http.get<BookDetailsResponse>(this.searchUrl + '/' + id);
	}

	// UTILS.

	/**
	 * TODO
	 * @param identifiers
	 * @returns
	 */
	public getIsbnIdentifiers(identifiers: IndustryIdentifier[]): IsbnInfo {
		let isbnInfo: IsbnInfo = {};
		for (let identifier of identifiers) {
			if (identifier.type === 'ISBN_13') {
				isbnInfo['isbn_13'] = identifier.identifier;
			} else if (identifier.type === 'ISBN_10') {
				isbnInfo['isbn_10'] = identifier.identifier;
			} else {
				isbnInfo['other'] = identifier.identifier;
			}
		}
		return isbnInfo;
	}

	/**
	 * Rework raw JSON data into formatted Book object.
	 * @param bookResponse - The details of the book JSON response.
	 * @returns The Book object.
	 */
	public getFormattedBookFromResponse(
		bookResponse: BookDetailsResponse,
	): Book {
		// console.log(bookResponse.volumeInfo.industryIdentifiers);
		let isbnInfo: IsbnInfo = this.getIsbnIdentifiers(
			bookResponse.volumeInfo.industryIdentifiers,
		);
		return {
			id: bookResponse.id,
			previewLink: bookResponse.volumeInfo.previewLink,
			title: bookResponse.volumeInfo.title,
			subtitle: bookResponse.volumeInfo.subtitle
				? bookResponse.volumeInfo.subtitle
				: 'N/A',
			authors: bookResponse.volumeInfo.authors,
			publisher: bookResponse.volumeInfo.publisher,
			publishDate: bookResponse.volumeInfo.publishedDate,
			description: bookResponse.volumeInfo.description,
			pageCount: bookResponse.volumeInfo.pageCount,
			imageLinks: bookResponse.volumeInfo.imageLinks
				? bookResponse.volumeInfo.imageLinks
				: null,
			textSnippet: bookResponse.searchInfo
				? bookResponse.searchInfo.textSnippet
				: 'N/A',
			isbn_10: isbnInfo['isbn_10'] || 'N/A',
			isbn_13: isbnInfo['isbn_13'] || 'N/A',
			other_id: isbnInfo['other'] || 'N/A',
		};
	}
}
