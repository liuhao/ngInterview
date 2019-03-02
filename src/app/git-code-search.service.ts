import { Injectable } from '@angular/core';
import { GitCodeSearch } from './git-code-search';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitCodeSearchService {
  cachedValue: string;
  search: Observable<GitCodeSearch>;
  constructor(private http: HttpClient) {
  }

  codeSearch = (query: string): Observable<GitCodeSearch> => {
    if (query.indexOf('user') <= -1) {
      query = query + '+user:angular';
    }
    if (!this.search) {
      this.search = this.http.get<GitCodeSearch>('https://api.github.com/search/code?q=' + query)
        .pipe(publishReplay(1)).pipe(refCount());
    } else if (this.cachedValue !== query) {
      this.search = null;
      this.codeSearch(query);
    }
    return this.search;
  }
}
