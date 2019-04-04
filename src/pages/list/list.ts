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
  objList: PerroModel[] = [];
  objLista: any = [];
  count: number = 0;

  regtoDesde: number = 0;
  totalReg: number = 0;
  totalPag: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _animal: AnimalProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.cargarPerros();
  }

  cargarPerros() {
    this.objListPerro = null;

    let promesa = new Promise(resolve => {
      this._animal.obterRazaPerrosAll().then((resp: any) => {
        this.objList = resp;

        let loading = this.loadingCtrl.create({
          spinner: "Crescent",
          content: "Cargando, un momento..."
        });

        loading.present();

        setTimeout(() => {
          loading.dismiss();
          this.objListPerro = this.objList.sort((a, b) =>
            a.dogRaza.localeCompare(b.dogRaza)
          );
        }, 1000);
      });

      resolve();
    });
    return promesa;
  }

  filtrarPerro(event: any) {
    console.log("event.target.value", event.target.value);
    let valor = event.target.value;

    if (valor == undefined) {
      this.cargarPerros();
    } else {
      if (valor.length >= 3) {
        this.objListPerro = this.objListPerro.filter(x =>
          x.dogRaza.includes(valor)
        );
        console.log(this.objListPerro);
      } else if (valor.length < 3) {
        this.cargarPerros();
      }
    }
  }

  siguientePagina(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  verDetalle(item: any) {
    let loading = this.loadingCtrl.create({
      spinner: "Crescent",
      content: "Cargando, un momento..."
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(DetallePerroPage, { dogRaza: item });
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
}
