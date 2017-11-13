import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import  {AuthProvider} from  '../../providers/auth/auth';
import  {ServiceProvider} from  '../../providers/service/service.service';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  // declaracion de variables
  services = [];
  baseUrl: any;
  email: any;
  token: any;
  haveServices = false;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public servProv: ServiceProvider,
     public load: LoadingController) {

      this.email = navParams.get("email");
      this.token = navParams.get("token");
      this.baseUrl = auth.getbaseUrl() + "resources/image/categories/viajes.png";

    this.servProv.getServicesFavorites(this.email,this.token).then(
      (serv) => {
        this.services = serv['data'];
        this.haveServices =  this.services.length > 0;
      }
    ).catch(
      (error) => {}
    );
  }
}
