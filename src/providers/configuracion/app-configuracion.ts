import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppConfiguracionService {

  constructor(private storage: Storage,
    private platform: Platform) {
  }

  public guardaInformacionPerro(objPerro: any) {
   

    if (this.platform.is('cordova')) {
      console.log('storage cordova', objPerro);
      this.storage.set('dogStorage', JSON.stringify(objPerro));
    } else {
      debugger;
      console.log('storage navegador', objPerro);
      localStorage.setItem('dogStorage',  objPerro);
    }
  }

/*  public saveZona(objListZona: any){
    debugger;
    if(this.platform.is('cordova')){
      this.storage.set('zonaStorage', JSON.stringify(objListZona));
    }else {
      localStorage.setItem('zonaStorage', JSON.stringify(objListZona));
    }
  }

  public saveSitio(objListSitio: any){
    debugger;
    if(this.platform.is('cordova')){
      this.storage.set('sitioStorage', JSON.stringify(objListSitio));
    }else {
      localStorage.setItem('sitioStorage', JSON.stringify(objListSitio));
    }
  }

  public saveGrupoResolutor(objListGrupo: any){
    if(this.platform.is('cordova')){
      this.storage.set('grupoStorage', JSON.stringify(objListGrupo));
    }else{
      localStorage.setItem('grupoStorage', JSON.stringify(objListGrupo));
    }
  }*/

  // LoadStorage Perro
  public loadStorageDog() {
    return new Promise((resolve) => {
      if (this.platform.is('cordova')) {

        this.storage.get('dogStorage').then(value => {
          if (value) {
            resolve(true);
          } else {
            resolve(false);
          }
        });

      } else {
        if (localStorage.getItem('dogStorage')) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  public loadStorage() {
    return new Promise((resolve) => {
      if (this.platform.is('cordova')) {

        this.storage.get('usuarioStorage').then(value => {
          if (value) {
            resolve(true);
          } else {
            resolve(false);
          }
        });

      } else {
        if (localStorage.getItem('usuarioStorage')) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  public getInformacionGeneralUsuario() {
    return new Promise((resolve) => {
      if (this.platform.is('cordova')) {
        this.storage.get('usuarioStorage').then(value => {
          if (value) {
            resolve(JSON.parse(value));
          } else {
            resolve('');
          }
        });
      } else {
        if (localStorage.getItem('usuarioStorage')) {
          resolve(localStorage.getItem('usuarioStorage'));
        } else {
          resolve('');
        }
      }
    });
  }

  public getNombreUsuario() {
    return new Promise((resolve) => {
      if (this.platform.is('cordova')) {
        this.storage.get('usuarioStorage').then(value => {
          if (value) {
            let user = JSON.parse(value);
            resolve(user['nombres']);
          } else {
            resolve('');
          }
        });

      } else {
        if (localStorage.getItem('usuarioStorage')) {
          let usuario = JSON.parse(localStorage.getItem('usuarioStorage'));
          resolve(usuario['nombres']);
        } else {
          resolve('');
        }
      }
    });
  }

  public deleteInformacionSesion() {
    return new Promise((resolve) => {
      if (this.platform.is('cordova')) {
        this.storage.remove('usuarioStorage');
        resolve('sesión storage eliminada');
      } else {
        localStorage.removeItem('usuarioStorage');
        resolve('sesión local eliminada');
      }
    })
  }
}
