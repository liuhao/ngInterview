import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: string;
  search: Observable<GitSearch>;
  constructor(private http: HttpClient) {
  }

  gitSearch: (q: string) => Observable<GitSearch> = (query: string): Observable<GitSearch> => {
    if (!this.search) {
      this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
        .pipe(publishReplay(1)).pipe(refCount());
      this.cachedValues = query;
    } else if (this.cachedValues !== query) {
      this.search = null;
      this.gitSearch(query);
    }
    return this.search;
  }
}
