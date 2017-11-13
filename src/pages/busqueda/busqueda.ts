import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {AuthProvider} from  '../../providers/auth/auth';
import  {ServiceProvider} from  '../../providers/service/service.service';


/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
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

    this.servProv.getServicesVisited(this.email,this.token).then(
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
