import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { PerroModel } from "../../interfaces/perro/perro.model";
import { AnimalProvider } from "../../providers/animal/animal";
import { GaleriaPage } from "../galeria/galeria";

/**
 * Generated class for the DetallePerroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-detalle-perro",
  templateUrl: "detalle-perro.html"
})
export class DetallePerroPage {
  perro: any = {};
  razas: any[] = [];
  nombrePerro: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _animal: AnimalProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.perro = this.navParams.get("dogRaza");

    this._animal.obterSubRaza(this.perro.dogRaza).then((resp: any) => {
      console.log("resp", resp);

      if (resp.status === "success") {
        this.razas = resp.message;
      }
    });
  }

  verGaleria(item: any) {
    console.log(item);
    let loading = this.loadingCtrl.create({
      spinner: "Crescent",
      content: "Cargando, un momento..."
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(GaleriaPage, { dogRaza: item });
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
}
