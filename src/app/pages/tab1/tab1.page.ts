import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor( private newsService: NewsService) {}

  private loadNews( event?: any) {

    this.newsService.getTopHeadLines()
      .subscribe( resp => {
        console.log('noticias', resp);
        if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        } else {
          this.news.push( ...resp.articles );
        }

        if ( event ) {
          event.target.complete();
        }
      });
         
  }

  ngOnInit() {
    this.loadNews();
  }

  loadMoreNews( event: any ) {
    console.log(event)
    this.loadNews( event );
  }

  

}
