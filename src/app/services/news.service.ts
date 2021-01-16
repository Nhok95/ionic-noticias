import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient ) { }

  getTopHeadLines() {
    return this.http.get<ResponseTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fba5c5d7552e4966882ea5b679f92ae9');
  }
}
