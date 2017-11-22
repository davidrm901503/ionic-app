import { Component,ViewChild, ElementRef } from '@angular/core';
import {
  Platform,
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { RatePage } from "../rate/rate";
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from "@ionic-native/call-number";
import { ServiceProvider } from "../../providers/service/service.service";
import { AuthProvider } from "../../providers/auth/auth";

declare var google;
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  latLng: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private service: any = {};
  private baseUrl: any;
  latitude:any
  longitude:any;
  loggedIn: boolean;
  constructor(public auth: AuthProvider, public servPro: ServiceProvider,private callNumber: CallNumber,private platform: Platform,
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     private geolocation: Geolocation) {

    this.service = this.navParams.get("service");
    this.baseUrl = this.navParams.get("baseUrl");
    this.latLng = new google.maps.LatLng(23.126606, -82.32528);
    // platform.ready().then(() => {
    //   // get current position
    //   geolocation.getCurrentPosition().then(pos => {
    //     // console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    //     // this.latitude = pos.coords.latitude;
    //     // this.longitude = pos.coords.longitude;
    //     this.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    //   });
    //   const watch = geolocation.watchPosition().subscribe(pos => {
    //     console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    //     this.latitude = pos.coords.latitude;
    //     this.longitude = pos.coords.longitude;
    //   });

    // });
}

  ionViewDidLoad() {
    this.loadMap();
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

  Llamar(number){
    this.callNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  loadMap(){
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }


  getLocation(){
        this.geolocation.getCurrentPosition().then((resp) => {

          this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

       let mapOptions = {
         center: this.latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       let marker = new google.maps.Marker({
         map: this.map,
         animation: google.maps.Animation.DROP,
         position: this.latLng
       });

       let content = "<h4>Mi posición</h4>";

       this.addInfoWindow(marker, content);



    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
