import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import {GitCodeSearch} from './git-code-search';
import {GitSearch} from './git-search';

@Injectable({
  providedIn: 'root'
})
export class UnifiedSearchService {

  constructor(private searchService: GitSearchService, private codeSearchService: GitCodeSearchService) { }
  unifiedSearch = (query: string): Observable<UnifiedSearch> => {
    return forkJoin([this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query)])
      .pipe(map((response: [GitSearch, GitCodeSearch]) => {
        return {
          repositories: response[0],
          code: response[1]
        };
      }));
  }
}
