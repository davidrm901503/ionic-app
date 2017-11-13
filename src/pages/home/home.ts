// componetes angular
import { Component, OnInit, ViewChild } from "@angular/core";
import {Http} from '@angular/http';
// providers
import  {SubCategoryProvider} from  '../../providers/sub-category/sub-category';
import  {AuthProvider} from  '../../providers/auth/auth';
import { ServiceProvider } from "../../providers/service/service.service";

// Paginas
import  {PopoverPage} from  '../pop-over/pop-over';
import {ServicesPage} from '../services/services';
import  {CategoriesPage} from  '../categories/categories';
import 'rxjs/add/operator/map';
// componetes ionic
import {PopoverController,NavController,} from 'ionic-angular';
import { NavParams, LoadingController, Keyboard } from "ionic-angular";
// native components
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicePage } from "../service/service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{
  subCategories = [];
  services = [];
  para: any;
  connetionDown: boolean;
  loggedIn: boolean;
  noFound: boolean;
  baseUrl: any;
  busqueda:boolean;
  loading: any;
  @ViewChild('search') search;


  constructor(
     public auth: AuthProvider,
     private popoverCtrl: PopoverController,
     public http: Http,
     public subCat: SubCategoryProvider,
     public navCtrl: NavController ,
     public servProv: ServiceProvider,
     private load: LoadingController,
     public keyboard: Keyboard,
     navParams: NavParams,splashScreen: SplashScreen) {

     this.busqueda = false;
     this.noFound = false;
     this.baseUrl = auth.getbaseUrl() + "resources/image/subcategories/";
     this.connetionDown =false;
     this.subCat.topSubcategories()
      .then(
        (subCat) => {
          this.subCategories =subCat['data'];
          setTimeout(function () {
            splashScreen.hide();
          },2);
        }
      ).catch(
        (error) => {
          this.connetionDown = true;
        }
      );
  }

  searchServices(query){

    this.loading = this.load.create();
    this.loading.present();
    this.servProv.getServiceBySearch(query).then(
      (serv) => {
        this.services = serv['data'];
        this.noFound = this.services.length == 0 ? true : false;
        this.loading.dismiss();
      }
    ).catch(
      (error) => {

          }
    );
  }
  ngOnInit() {
    this.auth.currentUser.subscribe(user=>{
      this.loggedIn = !!user;
    })
  }
  goSearch(keyCode) {
    if (keyCode === 13){
     this.busqueda = true;
     this.searchServices(this.search.value);
     this.keyboard.close();
    }
  }

  onCancel(e){
    this.services = [];
    this.busqueda = false;
    this.noFound =  false;
  }
  openServicePage(id){
    this.navCtrl.push(ServicePage,{
      serviceId:id
    })
  }

  onInput(e){

    if( this.search.value == "" )
      {
      this.busqueda = false;
      this.services = [];
      this.noFound =  false;
     }
  }
  delete(chip: Element) {
    chip.remove();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev
    });
  }
  openCategoriesPage(){
    this.navCtrl.push(CategoriesPage)
  }
  openServicesPage(id){
    this.navCtrl.push(ServicesPage,{
      subCatId:id
    });
  }
  reConnect(){

    this.connetionDown =false;


    this.subCat.topSubcategories()
    .then(
      (cat) => {
        this.subCategories = cat;

      }
    ).catch(
      (error) => {

        this.connetionDown = true;
          }
    );
  }
}

