import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article = null;
  @Input() index: Number = 0;

  constructor( private iab: InAppBrowser) { }

  ngOnInit() {}

  openNew() {
    console.log('Noticia', this.new.url);
    const browser = this.iab.create(this.new.url, '_system');

  }

}
