import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';
import { IonContent, IonInfiniteScroll, IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  scrollDown: boolean = false;

  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

  constructor( private newsService: NewsService ) {}

  private loadNews( category: string, infinityEvent?: any ) {

    this.newsService.getTopHeadLinesCategory( category )
      .subscribe( resp => {
        //console.log(`noticias de ${category}`, resp);

        if (resp.articles.length === 0) {
          infinityEvent.target.disabled = true;
          infinityEvent.target.complete();
          return;
        } else {
          this.news.push( ...resp.articles );
        }

        this.scrollDown = false;

        console.log("news length", this.news.length)

        if ( infinityEvent ) {
          infinityEvent.target.complete();
        }
      });
  }

  ngOnInit() {
    this.loadNews( this.categories[0] );
  }

  categoryChanged( segmentEvent: any ){
    //console.log("categoryChanged - segmentEvent", segmentEvent);

    this.scrollDown = true;

    this.infinite.disabled = false;
    this.content.scrollToTop();
    this.news = [];
    this.loadNews( segmentEvent.detail.value );
  }

  loadMoreNews ( infiniteEvent: any ) {
    //console.log("loadMoreNews - infiniteEvent", infiniteEvent);

    if (!this.scrollDown) {
      this.loadNews( this.segment.value, infiniteEvent );
    } else {
      infiniteEvent.target.complete();
    }

  }

}
