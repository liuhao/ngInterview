import { TestBed } from '@angular/core/testing';

import { GitUserSearchService } from './git-user-search.service';

describe('GitUserSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitUserSearchService = TestBed.get(GitUserSearchService);
    expect(service).toBeTruthy();
  });
});
