import {
  Component,
  ViewChild,
  trigger,
  transition,
  style,
  state,
  animate,
  keyframes
} from "@angular/core";
import { NavController, Slides, MenuController } from "ionic-angular";
import { MainPage } from "../main/main";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  animations: [
    trigger("bounce", [
      state(
        "*",
        style({
          transform: "translateX(0)"
        })
      ),
      transition(
        "* => rightSwipe",
        animate(
          "700ms ease-out",
          keyframes([
            style({ transform: "translateX(0)", offset: 0 }),
            style({ transform: "translateX(-65px)", offset: 0.3 }),
            style({ transform: "translateX(0)", offset: 1.0 })
          ])
        )
      ),
      transition(
        "* => leftSwipe",
        animate(
          "700ms ease-out",
          keyframes([
            style({ transform: "translateX(0)", offset: 0 }),
            style({ transform: "translateX(65px)", offset: 0.3 }),
            style({ transform: "translateX(0)", offset: 1.0 })
          ])
        )
      )
    ])
  ]
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Saltar";
  state: string = 'x';

  constructor(public navCtrl: NavController, private menuCtrl: MenuController) {
    this.menuCtrl.swipeEnable(false);
  }

  skip() {
    this.navCtrl.push(MainPage);
  }

  slideChanged() {
    if (this.slides.isEnd()) this.skipMsg = 'Ok, Continuar';
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) 
      this.state = 'rightSwipe';
    else 
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }
}
