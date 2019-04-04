import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AnimalProvider } from "../../providers/animal/animal";
import { PhotoViewer } from "@ionic-native/photo-viewer";

@IonicPage()
@Component({
  selector: "page-galeria",
  templateUrl: "galeria.html"
})
export class GaleriaPage {
  perro: any = {};

  arrayGaleria: any[]=[];

  constructor(public navCtrl: NavController, 
    public _animal: AnimalProvider,
    public navParams: NavParams, private photoViewer: PhotoViewer) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad GaleriaPage");
    this.perro = this.navParams.get("dogRaza");

    this._animal.obterGaleria(this.perro.dogRaza).then((resp: any) => {
      
      for(let valor of resp.message) {
        this.arrayGaleria.push(valor);
      }

      let nuevaData = this.agrupar( this.arrayGaleria, 3);
      

      this.arrayGaleria= nuevaData;

      console.log('this', this.arrayGaleria);
    });
    
  }


  private agrupar( arr:any, tamano:number ){

    let nuevoArreglo = [];
    for( let i = 0; i<arr.length; i+=tamano ){
      nuevoArreglo.push( arr.slice(i, i+tamano) );
    }
    console.log( nuevoArreglo );
    return nuevoArreglo;
  }

  showImagen(item: any) {
    console.log('item', item);

    this.photoViewer.show(item);
  }
}
