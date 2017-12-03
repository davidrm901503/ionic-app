import { Component } from '@angular/core';
import { IonicPage,NavParams,ModalController,NavController} from "ionic-angular";
// import { CallNumber } from '@ionic-native/call-number';
import  {ServiceProvider} from  '../../providers/service/service.service';
import { ApiProvider } from "../../providers/api/api";
import { RatePage } from "../rate/rate";
import { InfoPage } from "../info/info";
import { MapaPage } from "../mapa/mapa";
import { AuthProvider } from "../../providers/auth/auth";
import { GaleriaPage } from "../galeria/galeria";
import { ComentariosPage } from "../comentarios/comentarios";

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  response: Object;
  private service: any = {};
  private passedService: any = {};
  private baseUrl: any;
  cant_c :number;
  loggedIn: boolean;
  constructor(public navParams: NavParams,
    // private callNumber: CallNumber,
    public servPro: ServiceProvider,
    public api: ApiProvider,
    public modalCtrl: ModalController,
    public auth: AuthProvider,
    public navCtrl: NavController
   ) {
      // si recibo el id del servicio
      this.servPro.getService(this.navParams.get("serviceId")).then(data=> {
        this.response = data;
        this.service = data['data'];
      });

  }

  ionViewDidLoad() {
    this.loggedIn = this.auth.isLoggedIn();
    this.baseUrl = this.api.getbaseUrl();
   this.passedService = this.navParams.get("service");
   this.cant_c=this.passedService.servicecommentsList.length  ? this.passedService.servicecommentsList.length : 0
  }
  openRate(){
    const profileModal = this.modalCtrl.create(RatePage,{rated:this.passedService.rated});
    profileModal.onDidDismiss(data => {
      if(data.rate !== "cancel")
      this.servPro.rateservice(this.service.id,data.rate).then(
        data => {
          this.passedService.globalrate = data['data'].globalrate;
          this.passedService.rated =data['data'].rated;;
        });
    });

    profileModal.present();
  }

  openInfo(){
      this.navCtrl.push(InfoPage,{
        service:this.passedService,
        baseUrl:this.baseUrl,
        cant_c:this.cant_c
      });
  }
  openMapa(){
      this.navCtrl.push(MapaPage,{
        response:this.response,
        baseUrl:this.baseUrl,
        cant_c:this.cant_c,
        service:this.passedService
      });
  }
  openGaleria(){
    this.navCtrl.push(GaleriaPage,{
      service:this.passedService,
      baseUrl:this.baseUrl,
      cant_c:this.cant_c
    });
}
openComentarios(){
  this.navCtrl.push(ComentariosPage,{
    service:this.passedService,
    baseUrl:this.baseUrl,
    cant_c:this.cant_c
  });
}
}
