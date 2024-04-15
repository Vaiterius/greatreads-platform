import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IndustryIdentifier, IsbnInfo } from '../interfaces/book';

@Injectable({
	providedIn: 'root',
})
export class GoogleBooksApiService {
	private searchUrl: string = 'https://www.googleapis.com/books/v1/volumes';

	constructor(private http: HttpClient) {}

	public searchBooksByTitle(query: string) {
		var params = new HttpParams().set('q', `intitle:${query}`);
		return this.http.get<any>(this.searchUrl, { params });
	}

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
}
