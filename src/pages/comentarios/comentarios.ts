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

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html'
})
export class ComentariosPage {
  private service: any = {};
  private baseUrl: any;
  loggedIn: boolean;
  constructor(public auth: AuthProvider, public servPro: ServiceProvider,public modalCtrl: ModalController,private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams) {
    this.service = this.navParams.get("service");
    this.baseUrl = this.navParams.get("baseUrl");

  }
  ionViewDidLoad() {
    console.log(this.service);
    console.log(this.baseUrl);
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
