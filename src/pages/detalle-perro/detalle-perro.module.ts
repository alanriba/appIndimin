import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePerroPage } from './detalle-perro';

@NgModule({
  declarations: [
    DetallePerroPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePerroPage),
  ],
})
export class DetallePerroPageModule {}
