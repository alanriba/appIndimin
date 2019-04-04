import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AnimalProvider } from '../providers/animal/animal';


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  

  showSplash = true;

  appMenuItems: Array<MenuItem>;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public _animal: AnimalProvider) {
    this.initializeApp();

    this.appMenuItems = [
      { title: 'Tareas', component: HomePage, icon: 'ios-list' },
      { title: 'Nueva Tarea', component: ListPage, icon: 'ios-add-circle' }
    ];
  }

  goToPage(page) {
    this.nav.setRoot(page.component.name);
  }

  logout() {
    /*this._acsim.deleteInformacionSesion().then(()=>{
      this.rootPage = 'LoginPage';
      this.nav.setRoot(this.rootPage);
    });*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
