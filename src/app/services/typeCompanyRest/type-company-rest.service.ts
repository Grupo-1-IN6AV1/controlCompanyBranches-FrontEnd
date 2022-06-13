import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';


@Injectable({
  providedIn: 'root'
})
export class TypeCompanyRestService {
  
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken(),
  });

  constructor(
    private http: HttpClient,
    private companyRest : CompanyRestService
  ) { }
  
  getTypeCompany(){
    return this.http.get(environment.baseUrl + 'typeCompany/getTypeCompany', {headers: this.httpOptions});
  }
  
  getTypeCompanies(id: string){
    return this.http.get(environment.baseUrl + 'typeCompany/getTypeCompanies/'+ id, {headers: this.httpOptions});
  }

  saveTypeCompany(params : {})
  {
    return this.http.post(environment.baseUrl + 'typeCompany/saveTypeCompany', params,{headers: this.httpOptions});
  }

  deleteTypeCompany(id : string)
  {
    return this.http.delete(environment.baseUrl + 'typeCompany/deleteTypeCompany/' + id, {headers: this.httpOptions});
  }

  updateTypeCompany(id : string, params:{})
  {
    return this.http.put(environment.baseUrl + 'typeCompany/updateTypeCompany/' + id, params,{headers: this.httpOptions});
  }
}
