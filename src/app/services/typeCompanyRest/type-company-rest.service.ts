import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeCompanyRestService {
  
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  getTypeCompany(){
    return this.http.get(environment.baseUrl + 'typeCompany/getTypeCompany', {headers: this.httpOptions});
  }

}
