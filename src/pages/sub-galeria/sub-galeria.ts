import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalProvider } from '../../providers/animal/animal';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-sub-galeria',
  templateUrl: 'sub-galeria.html',
})
export class SubGaleriaPage {

  perro: any = {};
  nomRaza: string='';
  subRaza: string='';

  arrayGaleria: any[] = [];
  titleGaleria: string = "";

  constructor(
    public navCtrl: NavController,
    public _animal: AnimalProvider,
    public navParams: NavParams,
    private photoViewer: PhotoViewer
  ) {
    this.nomRaza = this.navParams.data[0].dogRaza;
    this.subRaza = this.navParams.data[1].subRaza;
    this.titleGaleria = this.perro.dogRaza + 'y la Sub Raza'+ this.perro.subRaza;
  }

  ionViewDidLoad() {
    console.log('this.perro', this.nomRaza);
    console.log('this.perro', this.subRaza);
    

    this._animal.obterGaleriaSubRaza(this.nomRaza, this.subRaza).then((resp: any) => {
      for (let valor of resp.message) {
        this.arrayGaleria.push(valor);
      }
      let nuevaData = this.agrupar(this.arrayGaleria, 3);
      this.arrayGaleria = nuevaData;
    });
  }

  private agrupar(arr: any, tamano: number) {
    let nuevoArreglo = [];
    for (let i = 0; i < arr.length; i += tamano) {
      nuevoArreglo.push(arr.slice(i, i + tamano));
    }
    console.log(nuevoArreglo);
    return nuevoArreglo;
  }

  showImagen(item: any) {
    console.log("item", item);

    this.photoViewer.show(item);
  }
}
