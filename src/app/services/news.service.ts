import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headLinesPage: number = 0;

  currentCategory: string = '';
  categoryPage: number = 0;

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( query: string ) {
    
    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {

    this.headLinesPage++;

    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&page=${ this.headLinesPage }`);
  }

  getTopHeadLinesCategory( category: string ) {

    if ( this.currentCategory === category ) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = category;
    }

    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${ category }&page=${ this.categoryPage }`);
  }
}
