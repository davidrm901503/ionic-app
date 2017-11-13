import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {AuthProvider} from  '../../providers/auth/auth';
import  {ServiceProvider} from  '../../providers/service/service.service';

@IonicPage()
@Component({
  selector: 'page-myservices',
  templateUrl: 'myservices.html',
})
export class MyservicesPage {
  // declaracion de variables
  services = [];
  baseUrl: any;
  email: any;
  token: any;
  haveServices = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public servProv: ServiceProvider) {

      this.email = navParams.get("email");
      this.token = navParams.get("token");
      this.baseUrl = auth.getbaseUrl() + "resources/image/categories/viajes.png";

    this.servProv.getMyServices(this.email,this.token).then(
      (serv) => {
        this.services = serv['data'];
        this.haveServices =  this.services.length > 0;
      }
    ).catch(
      (error) => {}
    );
  }

  ionViewDidLoad() {
  }

}
