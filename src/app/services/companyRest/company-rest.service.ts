import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  test(message: string){
    console.log(message);
  }

  //Solicitudes HTTP propias de la entidad Usuario
  register(params: {}){
    let body = JSON.stringify(params); //CONVERTIR A JSON
    return this.http.post(environment.baseUrl + 'company/register', body, {headers: this.httpOptions});
  }

  login(params: {}){
    let body = JSON.stringify(params); //CONVERTIR A JSON
    return this.http.post(environment.baseUrl + 'company/login', body, {headers: this.httpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  }

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity =  JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity;
  }

}
