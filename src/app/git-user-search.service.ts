import { Injectable } from '@angular/core';
import {GitUserSearch} from './git-user-search';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitUserSearchService {
  cachedValues: Array<{
    [query: string]: GitUserSearch;
  }> = [];
  constructor(private http: HttpClient) { }

  gitSearchUser = (query: string) => {
    const promise = new Promise((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);
      } else {
        this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then((response) => {
            resolve(response as GitUserSearch);
          }, (error) => {
            reject(error);
          });
      }
    })
    return promise;
  }
}
