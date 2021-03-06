import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, ViewController, App, AlertController} from "ionic-angular";
import {ServiceProvider} from '../../providers/service/service.service';
import {ServicePage} from '../service/service';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {Create1Page} from '../create1/create1';
import {PagarPage} from '../pagar/pagar';

@IonicPage()
@Component({
  selector: 'page-myservices',
  templateUrl: 'myservices.html',

})
export class MyservicesPage {
  // declaracion de variables
  services = [];
  temp = []
  email: any;
  token: any;

  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public appCtrl: App,
              public servProv: ServiceProvider, private photoViewer: PhotoViewer,
              public load: LoadingController, private alertCtrl: AlertController) {
    let loading = this.load.create({
      content: "Cargando..."
    });
    loading.present();
    this.servProv.getMyServices().then(
      (serv) => {
        this.services = serv['data'];
        this.temp = this.services;
        loading.dismiss();
      }
    ).catch(
      (error) => {
        loading.dismiss();
      }
    );
  }

  getSearchValue(value) {
    this.services = this.temp;
    if (value && value.trim() == '') {
      this.services = this.temp;
    }
    if (value && value.trim() != '') {
      this.services = this.services.filter((item) => {
        return (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }
  }

  delete(id) {

    let confirm = this.alertCtrl.create({
      title: "¿Está seguro que desea eliminar el servicio? ",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
          }
        },
        {
          text: "Si",
          handler: () => {
            this.servProv.deleteService(id).then(
              (response) => {
                this.services = this.services.filter(service => service.id !== id);
              }
            ).catch(
              (error) => {
              }
            );
          }
        }
      ]
    });
    confirm.present();


  }

  ionViewDidLoad() {
  }

  viewImg(img) {
    this.photoViewer.show(img);
  }

  openServicePage(id, serv) {
    // this.navCtrl.push("ServicePage",{
    //   serviceId: id,
    //   service:serv
    // });
    // this.viewCtrl.dismiss();
    this.navCtrl.push(ServicePage, {
      serviceId: id,
      service: serv
    });
    // this.appCtrl.getActiveNavs()[0].push(ServicePage, {
    //   serviceId: id,
    //   service:serv
    // });

  }

  pagar() {
    this.navCtrl.push(PagarPage);
  }

  editService(serv) {
    this.navCtrl.push(Create1Page, {
      service: serv
    });
  }

}
