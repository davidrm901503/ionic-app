import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthProvider} from  '../auth/auth';


@Injectable()
export class SubCategoryProvider {

  private respuesta:any ;
  private subcategories: Object[] ;
  constructor(public http: Http,public auth: AuthProvider) {  }

  topSubcategories():Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl()+'api/topSubcategories')
      .toPromise()
      .then(
        (response) => {
           this.respuesta = response;
           this.subcategories = JSON.parse(this.respuesta._body);
          return this.subcategories;
        }

      ).catch(this.handleError)
  }
  getsubcategories(category):Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl()+ 'api/subcategories/'+category)
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.subcategories = JSON.parse(this.respuesta._body);
         return this.subcategories;
        }

      ).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}


