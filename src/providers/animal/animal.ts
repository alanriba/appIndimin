import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Global } from "../../shared/global";
import { PerroModel } from "../../interfaces/perro/perro.model";
import { AppConfiguracionService } from "../configuracion/app-configuracion";

@Injectable()
export class AnimalProvider {
  urlServiceDog = "";
  perroArray: any[] = [];

  constructor(
    private _http: HttpClient,
    _platform: Platform,
    public _appConfiguracion: AppConfiguracionService
  ) {
    if (_platform.is("cordova")) {
      this.urlServiceDog = Global.BASE_URL_DOG;
    } else {
      this.urlServiceDog = "/api";
    }
  }

  // método para obtener la informacion de los perros
  public obterRazaPerrosAll() {
    let promesa = new Promise((resolve, reject) => {
      this._http
        .get(`${Global.BASE_ENDPOINT_LIST_RAZA_ALL}`)
        .subscribe((resp: any) => {
           this.perroArray = [];
           for (let a in resp.message) {
            this._http.get(`${Global.BASE_ENDPOINT_DOG_IMG}` + a.toString() + `/images/random`)
                      .subscribe((img: any) => {
                  if (img.message != "") {
                     let perro: PerroModel = new PerroModel();
                      perro.dogRaza = a.toString();
                      perro.dogImagen = img.message; 
                    this.perroArray.push(perro);
                  } 
                });
              }
              resolve(this.perroArray);
        });
    });
    return promesa;
  }

  public obtenerImagen(nomRaza: string) {
    let promesa = new Promise((resolve) => {
      return this._http
        .get(`${Global.BASE_ENDPOINT_DOG_IMG}` + nomRaza + `/images/random`)
        .subscribe((resp: any) => {
          if (resp.message != "") {
            let perro = new PerroModel();
            perro.dogRaza = nomRaza;
            perro.dogImagen = resp.message;
            this.perroArray.push(perro);
          }
          resolve();
        });
    });
    return promesa;
  }

  public obterSubRaza(raza: string) {
    let promesa = new Promise((resolve, reject) => {
      this._http
        .get(`${Global.BASE_ENDPOINT_LIST_SUB_RAZA_ALL}`+ raza+'/list')
        .subscribe((resp: any) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  public obterGaleriaSubRaza(raza: string, subRaza: string) {

    console.log('url', `${Global.BASE_ENDPOINT_LIST_SUB_RAZA_IMG}`+ raza +'/' + subRaza + '/images');
    let promesa = new Promise((resolve, reject) => {
      this._http
        .get(`${Global.BASE_ENDPOINT_LIST_SUB_RAZA_IMG}`+ raza+'/' + subRaza+ '/images')
        .subscribe((resp: any) => {
          resolve(resp);
        });
    });
    return promesa;
  }


  public obterGaleria(raza: string) {
    let promesa = new Promise((resolve, reject) => {
      this._http
        .get(`${Global.BASE_ENDPOINT_LIST_SUB_RAZA_ALL}`+ raza+'/images')
        .subscribe((resp: any) => {
          resolve(resp);
        });
    });
    return promesa;
  }
}
