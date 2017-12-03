import { Component } from '@angular/core';
import { IonicPage, NavParams} from "ionic-angular";





@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html'
})
export class ComentariosPage {
  private service: any = {};
  private baseUrl: any;
  loggedIn: boolean;
  cant_c:any;
  constructor( public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.service = this.navParams.get("service");
    this.baseUrl = this.navParams.get("baseUrl");
    this.cant_c = this.navParams.get("cant_c");
  }


}
