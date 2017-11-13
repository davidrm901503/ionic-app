import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import  {ServiceProvider} from  '../../providers/service/service.service';
import  {AuthProvider} from  '../../providers/auth/auth';
import { ServicePage } from "../service/service";

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-services",
  templateUrl: "services.html"
})
export class ServicesPage {

  filtro: { ciudad: string,categoria:string };
  private subCatId: any;
  services = [];
  categoryId: any;
  loading: any;

  private baseUrl: any;
  haveServices = false;
  loggedIn: boolean;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public navParams: NavParams,
    public servProv: ServiceProvider,
    public load: LoadingController
  ) {
    this.baseUrl = auth.getbaseUrl() + "resources/image/subcategories/";
    this.loggedIn = auth.isLoggedIn();
    this.subCatId = navParams.get("subCatId");
    this.filtro = {ciudad:"",categoria:""};
    // this.ciudadOptions = {
    //   title: "Filtar por ciudad"
    // };
    // this.catOptions = {
    //   title: "Filtar por categoria"
    // };

    this.loading = this.load.create();
    this.loading.present();
    this.servicesBySubCat();
  }
  // cuando cambia un filtro
  onChange(value) {
     this.filtro.ciudad = value;
    // this.services =   this.services.filter(item => {
    // return (item.title +  ' ' +item.address ).toLowerCase().indexOf(this.ciudad) > -1;
    // });
  }
  onChange2(value) {
    this.filtro.categoria = value;
   // this.services =   this.services.filter(item => {
   // return (item.title +  ' ' +item.address ).toLowerCase().indexOf(this.ciudad) > -1;
   // });
 }

  // servicios dada una subCat
  servicesBySubCat() {
    this.servProv
      .getServiceBySubCat(this.subCatId)
      .then(serv => {
        this.services = serv["data"];
        this.haveServices = this.services.length > 0;
        this.loading.dismiss();
      })
      .catch(error => {});
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ServicesPage");
  }
  openServicePage(id) {
    this.navCtrl.push(ServicePage, {
      serviceId: id
    });
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    this.servProv
      .getServiceBySubCat(this.subCatId)
      .then(serv => {
        this.services = serv;
        console.log("Async operation has ended");
        refresher.complete();
      })
      .catch(error => {});
  }

  deleteCiudad(chip: Element) {
    chip.className = "hidden";
    this.filtro.ciudad = "";
    //chip.remove();
  }
  deleteCat(chip: Element) {
    chip.className = "hidden";
    this.filtro.categoria = "";
    //chip.remove();
  }
}
