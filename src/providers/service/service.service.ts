import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from  '../auth/auth'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

 private respuesta:any ;
 private services: Object[] ;

  constructor(public http: Http,public auth: AuthProvider) {
  }
  getServiceBySubCat(subcategory):Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl() + 'api/servicessub/'+subcategory)
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.services = JSON.parse(this.respuesta._body);
         return this.services;
        }
      ).catch()
  }
  getServiceBySearch(search):Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl() + 'api/searchService/'+search)
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.services = JSON.parse(this.respuesta._body);
         return this.services;
        }
      ).catch()
  }

  getServicesFavorites(email,token):Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl() + 'api/myfavorites?email='+email+'&token='+token)
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.services = JSON.parse(this.respuesta._body);
         return this.services;
        }
      ).catch()
  }

  getMyServices(email,token):Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl() + 'api/myfavorites?email='+email+'&token='+token)
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.services = JSON.parse(this.respuesta._body);
         return this.services;
        }
      ).catch()
  }
  getServicesVisited(email,token):Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl() + 'api/myvisits?email='+email+'&token='+token)
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.services = JSON.parse(this.respuesta._body);
         return this.services;
        }
      ).catch()
  }

}
