import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { PerroModel } from "../../interfaces/perro/perro.model";
import { AnimalProvider } from "../../providers/animal/animal";
import { DetallePerroPage } from "../detalle-perro/detalle-perro";

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  objListPerro: PerroModel[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _animal: AnimalProvider, private loadingCtrl: LoadingController
  ) {
   
  }

  ionViewDidLoad() {
    this._animal.obterRazaPerrosAll().then((resp: any) => {
      debugger;
      
      this.objListPerro.push(resp);
      
      for(let a = 0; a < this.objListPerro.length; a ++) {
        console.log('o',this.objListPerro[0][a]);
      }
      
      let orden = this.objListPerro.sort((a,b)=> a.dogRaza.localeCompare(b.dogRaza));
      console.log('orden', orden);
    });
  }

  filtrarPerro(event: any) {
    let valor = event.target.value;
    console.log(valor);
  }

  siguientePagina(infiniteScroll) {
    setTimeout(() => {
      this._animal.obterRazaPerrosAll().then(() => {
        infiniteScroll.complete();
      });
    }, 500);
  }

  verDetalle(item:any) {
    
      let loading = this.loadingCtrl.create({
        spinner: 'Crescent',
        content: 'Cargando, un momento...'
      });
  
      loading.present();
  
      setTimeout(() => {
        this.navCtrl.push(DetallePerroPage, {'dogRaza': item});
      }, 1000);
  
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
     
  }
}
