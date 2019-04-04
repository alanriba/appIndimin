import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, List } from 'ionic-angular';
import { DetallePerroPage } from '../detalle-perro/detalle-perro';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goToNew() {
    let loading = this.loadingCtrl.create({
      spinner: 'Crescent',
      content: 'Cargando, un momento...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(ListPage);
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

}
