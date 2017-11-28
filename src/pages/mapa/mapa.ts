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
  positions:  Object[];
  infowindow =  new google.maps.InfoWindow;
  response: any;
  latLng: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  distanceMatrix = new google.maps.DistanceMatrixService;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private service: any = {};
  private baseUrl: any;
  latitude:any
  longitude:any;
  loggedIn: boolean;
  currentPosition:any;
  constructor(public auth: AuthProvider, public servPro: ServiceProvider,private callNumber: CallNumber,private platform: Platform,
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     private geolocation: Geolocation) {

    platform.ready().then(() => {


      // // get current position
      // geolocation.getCurrentPosition().then(pos => {
      //   this.currentPosition = pos;
      //   // this.longitude = pos.coords.longitude;
      //   this.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      //   this.loadMap();
      // });
      // const watch = geolocation.watchPosition().subscribe(pos => {
      //   this.currentPosition = pos;
      // });

    });
}

  ionViewDidLoad() {
    this.response = this.navParams.get("response");
    this.service = this.response['data'];
    this.positions = this.response['positions'];
    this.baseUrl = this.navParams.get("baseUrl");
    // this.latLng = new google.maps.LatLng(23.126606, -82.32528);

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadMap();
      this.latitude=resp.coords.latitude;
      this.longitude =resp.coords.longitude
      this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map.setCenter(this.latLng);
      this.map.setZoom(15);
     let marker = new google.maps.Marker({
       map: this.map,
       position: this.latLng
     });
     let content = "<h4>Mi posición</h4>";
     this.addInfoWindow(marker, content);
    });

  }
  // mostrar ruta entre 2 puntos
  calculateAndDisplayRoute(p) {
    console.log(p);
    console.log(this.latLng);

    var start = new google.maps.LatLng(this.latitude,this.longitude);
    //var end = new google.maps.LatLng(38.334818, -181.884886);
    var end = new google.maps.LatLng(p.latitude, p.longitude);
    this.directionsService.route({
      origin: start,
      destination:  end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      console.log(status);
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
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
      this.directionsDisplay.setMap(this.map);
      var locations = this.response['positions'];

      for (let i = 0; i < locations.length; i++) {
      let marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude)
      });
      let content = "<h4>"+locations[i].title +"</h4>";
      this.addInfoWindow(marker, content);
      }
    }


  getLocation(){
        this.geolocation.getCurrentPosition().then((resp) => {
        this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map.setCenter(this.latLng);
        this.map.setZoom(15);
       let marker = new google.maps.Marker({
         map: this.map,
         position: this.latLng
       });
       let content = "<h4>Mi posición</h4>";
       this.addInfoWindow(marker, content);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
  addInfoWindow(marker, content){

    google.maps.event.addListener(marker, 'click', () => {
      this.infowindow.setContent(content)
      this.infowindow.open(this.map, marker);
    });

  }

}
