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

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( query: string ) {
    
    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {
    return this.executeQuery<ResponseTopHeadlines>('/top-headlines?country=us');
  }

  getTopHeadLinesCategory( category: string ) {
    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${ category }`);
  }
}
