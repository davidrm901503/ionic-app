import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { RatePage } from "../rate/rate";
import { ServiceProvider } from "../../providers/service/service.service";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {
  private service: any = {};
  private baseUrl: any;
  loggedIn: boolean;
  constructor( public auth: AuthProvider,public servPro: ServiceProvider,public modalCtrl: ModalController,private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams) {
    this.service = this.navParams.get("service");
    this.baseUrl = this.navParams.get("baseUrl");
  }

  Llamar(number){
    this.callNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
  openRate(){
    const profileModal = this.modalCtrl.create(RatePage);
    profileModal.onDidDismiss(data => {
      if(data.rate != "cancel")
      this.servPro.rateservice(this.service.id,data.rate).then(
        data => {
          console.log(data);
        });

    });

    profileModal.present();
  }

}
