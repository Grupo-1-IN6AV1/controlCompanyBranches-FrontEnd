import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyAdminRestService 
{

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken(),
  });

  constructor
  (
    private companyRest : CompanyRestService,
    private http : HttpClient, 
  )
  {}


  //FUNCIONES DE ADMINISTRADOR//
  getCompanies()
  {
    return this.http.get(environment.baseUrl + 'company/getCompanies', {headers: this.httpOptions});
  }

  getCompany(id : string)
  {
    return this.http.get(environment.baseUrl + 'company/getCompany/' + id, {headers : this.httpOptions});
  }

  saveCompany(params : {})
  {
    return this.http.post(environment.baseUrl + 'company/registerIsAdmin', params, {headers: this.httpOptions});
  }

  deleteCompany(id : string)
  {
    return this.http.delete(environment.baseUrl + 'company/deleteIsAdmin/' + id, {headers: this.httpOptions});
  }

  updateCompany(id: string, params : {})
  {
    return this.http.put(environment.baseUrl + 'company/updateIsAdmin/' + id , params, {headers: this.httpOptions})
  }

}
