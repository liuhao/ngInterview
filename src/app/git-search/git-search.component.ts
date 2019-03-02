import { Component, OnInit } from '@angular/core';
import { UnifiedSearchService } from '../unified-search.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import {UnifiedSearch} from '../unified-search';
import {GitSearch} from '../git-search';
import {GitSearchService} from '../git-search.service';
import {GitCodeSearchService} from '../git-code-search.service';
import {GitCodeSearch} from '../git-code-search';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  codeSearchResults: GitCodeSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  page: number;

  constructor(private unifiedSearchService: UnifiedSearchService,
              private gitSearchService: GitSearchService, private gitCodeSearchService: GitCodeSearchService,
              private route: ActivatedRoute,
              private router: Router) { }
  // @ts-ignore
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.page = parseInt(params.get('page'), 10);
      return this.gitSearch(this.searchQuery);
    });
    this.route.data.subscribe( (result) => {
      this.title = result.title;
    });
  }

  gitSearchOld = (query: string) => {
    this.gitCodeSearchService.codeSearch(this.searchQuery).subscribe( (response1) => {
      this.codeSearchResults = response1;
      console.log(response1);
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
    this.gitSearchService.gitSearch(this.searchQuery).subscribe( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });

  }

  gitSearch = (query: string) => {
    this.unifiedSearchService.unifiedSearch(query).subscribe((response) => {
      console.log(response);
      this.searchResults = response.repositories;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  sendQuery = () => {
    this.searchResults = null;
    const search: string = this.model.q;
    let params = '';
    this.modelKeys.forEach( (elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.model[elem]) {
        params += '+' + elem + ':' + this.model[elem];
      }
    })
    this.searchQuery = search;
    if (params !== '') {
      this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch(this.searchQuery);
  }

  nextPage = () => {
    this.page += 1;
    this.sendQuery();
  }

  previousPage = () => {
    if (this.page > 1) {
      this.page -= 1;
      this.sendQuery();
    }
  }
}
