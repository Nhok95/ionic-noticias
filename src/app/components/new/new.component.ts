import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article = null;
  @Input() index: Number = 0;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing) { }

  ngOnInit() {}

  openNew() {
    console.log('Noticia', this.new.url);
    const browser = this.iab.create(this.new.url, '_system');

  }

  async launchMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-social',
          handler: () => {
            console.log('Compartir');
            this.socialSharing.share(
              this.new.title,
              this.new.source.name,
              '',
              this.new.url

            );
          }
        }, 
        {
          text: 'Favorito',
          icon: 'star',
          handler: () => {
            console.log('Favorito');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
     ]
    });
  
    await actionSheet.present();
  }

}
