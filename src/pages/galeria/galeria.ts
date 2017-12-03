import { Component } from '@angular/core';
import { IonicPage, NavParams} from "ionic-angular";



@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {
  private service: any = {};
  private baseUrl: any;
  cant_c:any;
  loggedIn: boolean;
  constructor(public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.service = this.navParams.get("service");
    this.baseUrl = this.navParams.get("baseUrl");
    this.cant_c = this.navParams.get("cant_c");

  }

}
