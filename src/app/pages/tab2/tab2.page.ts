import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

  constructor( private newsService: NewsService ) {}

  private uploadNews( category: string ) {

    this.newsService.getTopHeadLinesCategory( category )
      .subscribe( resp => {
        console.log('noticias', resp);
        this.news.push( ...resp.articles );
      });
  }

  ngOnInit() {
    this.uploadNews( this.categories[0] );
  }

  categoryChanged( $event: any ){
    this.news = [];
    this.uploadNews( $event.detail.value );
  }

}
