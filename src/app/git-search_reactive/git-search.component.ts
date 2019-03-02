import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  page: number;
  form: FormGroup;
  formControls = {};

  constructor(private gitSearchService: GitSearchService,
              private route: ActivatedRoute,
              private router: Router) {
    this.modelKeys.forEach( (key) => {
      const validators = [];
      if (key === 'q') {
        validators.push(Validators.required);
      }
      if (key === 'stars') {
        validators.push(Validators.maxLength(4));
      }
      validators.push(this.noSpecialChars);
      this.formControls[key] = new FormControl(this.model[key], validators);
    });
    this.form = new FormGroup(this.formControls);
  }
  // @ts-ignore
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  noSpecialChars(c: FormControl) {
    const REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    return REGEXP.test(c.value) ? {
      validateEmail: {
        valid: false
      }
    } : null;
  }

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

  gitSearch = (query: string) => {
    this.gitSearchService.gitSearch(query).then((response) => {
      // @ts-ignore
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  sendQuery = () => {
    this.searchResults = null;
    const search: string = this.form.value.q;
    let params = '';
    this.modelKeys.forEach( (elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.form.value[elem]) {
        params += '+' + elem + ':' + this.form.value[elem];
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
