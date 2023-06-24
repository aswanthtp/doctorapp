import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { login } from '../login';
import { register } from '../register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {
  username:string;

  loggedIn: boolean= false;

  

  login(){
    this.loggedIn=true;
  }
  logout(){
    this.loggedIn=false;
  }
  ifAuth(){
    return this.loggedIn;
  }


  constructor(private httpClient: HttpClient) { }
  getusers(userr: login): Observable<any> {
    console.log("GET USER");
    console.log(userr.username);
    console.log(userr.password);

    return this.httpClient.post<any>(`http://localhost:8088/api/users/login`, userr, { headers: new HttpHeaders().set('responseType', 'text') }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', userr.username);
          let tokenStr = userData.token;
          console.log("Token string: " + tokenStr);
          localStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );

  }
  getCurrUser(){
    return this.username;
  }

  setUserName(uname: string)
  {
    this.username = uname;
  }

  addUser(register: register): Observable<register> {
    return this.httpClient.post<register>('http://localhost:8088/api/user/register', register);
  }

  setBearerToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getBearerToken() {
    return sessionStorage.getItem('token');
  }
}
