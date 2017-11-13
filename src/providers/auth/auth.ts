import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable,BehaviorSubject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {User} from '../../models/user';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public currentUser = new BehaviorSubject(false);

  private apiBaseUrl = 'http://192.168.137.1/login/';  // URL to web apid

  constructor(public http: Http) {
    this.currentUser.next(this.getUser());
  }

  login(user: User): Observable<boolean> {
    const body = JSON.stringify({email: user.email, password: user.password});
    return this.http.post(this.apiBaseUrl+'auth/login', body)
      .map(res=> res.json())
      .map(user =>{
        if (user. error){
            return false;
        }
        else{
          console.log(user);
          localStorage.setItem('user',JSON.stringify({email: user.email, token: user.token,rol:user.rol}));
          this.currentUser.next(user);
		  
        }
		return !!user;
      
    });

  }
  // regista y autentica al usuario si todo sale bien
  signUp(user: User): Observable<boolean> {
    const body = JSON.stringify({email: user.email, password: user.password});
    return this.http.post(this.apiBaseUrl+'auth/signup', body)
      .map(res=> res.json())
      .map(user =>{
      if (user){
        localStorage.setItem('user',JSON.stringify({email: user.email, token: user.token}));
        this.currentUser.next(user);
      }
      return !!user;
    });

  }
  getUser(){
    var user = localStorage.getItem('user');
    return user ? JSON.parse(user): false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.next(false);
  }

  isLoggedIn(): boolean{
    return !!this.getUser();
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.apiBaseUrl+'api/forgotpassword', email).map((response: Response) => {
        if (response.json().result === true) {
          return true;
        } else {
          return {error: response.json().result};
        }
      }
    );

  }

  getbaseUrl(): string{
    return this.apiBaseUrl;
    }


}
