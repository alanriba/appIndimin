import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { MainPage } from "../pages/main/main";

//Animaciones
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AnimalProvider } from "../providers/animal/animal";
import { HttpClientModule } from "@angular/common/http";
import { AppConfiguracionService } from "../providers/configuracion/app-configuracion";

import { PhotoViewer } from '@ionic-native/photo-viewer';

//Storage
import { IonicStorageModule } from "@ionic/storage";
import { DetallePerroPage } from "../pages/detalle-perro/detalle-perro";
import { GaleriaPage } from "../pages/galeria/galeria";

@NgModule({
  declarations: [MyApp, HomePage, ListPage, MainPage, DetallePerroPage, GaleriaPage],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage, MainPage, DetallePerroPage, GaleriaPage],
  providers: [
    StatusBar,
    PhotoViewer,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AnimalProvider,
    AppConfiguracionService
  ]
})
export class AppModule {}
