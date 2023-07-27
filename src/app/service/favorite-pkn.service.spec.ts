import { TestBed } from '@angular/core/testing';

import { FavoritePknService } from './favorite-pkn.service';

describe('FavoritePknService', () => {
  let service: FavoritePknService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePknService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
