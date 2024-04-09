import { TestBed } from '@angular/core/testing';

import { GoogleBooksApiService } from './google-books-api.service';

describe('GoogleBooksApiService', () => {
  let service: GoogleBooksApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleBooksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
