import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthProvider} from  '../auth/auth'


@Injectable()
export class CategoryProvider {

  private respuesta:any ;
  private categories: Object[] ;
  constructor(public http: Http,public auth: AuthProvider) {
  }
  getcategories():Promise<Object[]>{
    return this.http.get(this.auth.getbaseUrl() + 'api/categories')
      .toPromise()
      .then(
        (response) => {
          this.respuesta = response;
          this.categories = JSON.parse(this.respuesta._body);
         return this.categories;
        }
      ).catch()
  }

}


