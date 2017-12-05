import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Create4Page } from '../create4/create4';
import { sendService } from '../../models/sendService';

/**
 * Generated class for the Create3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create3',
  templateUrl: 'create3.html',
})
export class Create3Page {
  service: sendService;
  week_days = [
    {title: 'Lunes', value: 0},
    {title: 'Martes', value: 1},
    {title: 'Miercoles', value: 2},
    {title: 'Jueves', value: 3},
    {title: 'Viernes', value: 4},
    {title: 'Sabado', value: 5},
    {title: 'Domingo', value: 6},
];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.service =this.navParams.get("service");
  }

  ionViewDidLoad() {

  }
  goToCreate2(){
    this.navCtrl.pop();
  }
  goToCreate4(){

      this.navCtrl.push(Create4Page, {
        service: this.service
      });
  }


}
