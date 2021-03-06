import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { UnifiedSearchService } from './unified-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoSpecialCharsDirective } from './no-special-chars.directive';
import {FavoriteTextPipe} from './favorite-text.pipe';
import {RepositoryDisplayComponent} from './repository-display/repository-display.component';
import {CodeDisplayComponent} from './code-display/code-display.component';
import {FadeDirective} from './fade.directive';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', redirectTo: '/search/angular/1', pathMatch: 'full'},
  { path: 'search/:query', redirectTo: '/search/:query/1', pathMatch: 'full'},
  { path: 'search/:query/:page', component: GitSearchComponent, data: { title: 'Git Search' } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    NoSpecialCharsDirective,
    FavoriteTextPipe,
    RepositoryDisplayComponent,
    CodeDisplayComponent,
    FadeDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule
  ],
  providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
