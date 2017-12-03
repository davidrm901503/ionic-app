import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/api/api';
import { RatePage } from '../../pages/rate/rate';
import { ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service.service';
import {PhotoViewer} from '@ionic-native/photo-viewer';

@Component({
  selector: 'serv-up-info',
  templateUrl: 'serv-up-info.html'
})
export class ServUpInfoComponent {
	@Input() passedService: Object ={};
  baseUrl: any;
  loggedIn: boolean;
  @Input() cant_c :number = 0;
  @Output() rateService: EventEmitter<any> = new EventEmitter<any>();

  constructor(public api: ApiProvider, public auth: AuthProvider,
    private callNumber: CallNumber,
    public servPro: ServiceProvider,
    public modalCtrl: ModalController,
    private photoViewer: PhotoViewer
  ) {

  }
  ngAfterViewInit(){
    this.loggedIn = this.auth.isLoggedIn();
    this.baseUrl = this.api.getbaseUrl();
  }
  Llamar(number,id){

    this.callNumber.callNumber(number, true)
    .then(() => {
      this.api.contactservice(this.passedService['id']);
    })
    .catch(() => console.log('Error launching dialer'));
  }
  openRate(id,rated){
    const profileModal = this.modalCtrl.create(RatePage,{rated:rated});
    profileModal.onDidDismiss(data => {
      if(data.rate !== "cancel")
      this.servPro.rateservice(id,data.rate).then(
        data => {
          //  this.rateService.emit({globalRate:data['data'].globalrate,rated:data['data'].rated});
          this.passedService['globalrate'] = data['data'].globalrate;
          this.passedService['rated'] =data['data'].rated;;
        });
    });

    profileModal.present();
  }
  viewImg(img) {
    this.photoViewer.show(this.baseUrl + img);
  }

}
