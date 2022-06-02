import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken(),
  });

  constructor(
    private http: HttpClient,
    private companyRest : CompanyRestService
  ) { }

  getProduct(){
    return this.http.get(environment.baseUrl + 'companyProduct/getProducts', {headers: this.httpOptions});
  }

  saveProduct(params:{}){
    return this.http.post(environment.baseUrl + 'companyProduct/saveProduct', params ,{headers: this.httpOptions});
  }

  deleteProduct(id : string)
  {
    return this.http.delete(environment.baseUrl + 'companyProduct/deleteProduct/' + id, {headers: this.httpOptions});
  }

  updateProduct(id : string, params:{})
  {
    return this.http.put(environment.baseUrl + 'companyProduct/updateProduct/' + id, params,{headers: this.httpOptions});
  }

  getExactProduct(id:string)
  {
    return this.http.get(environment.baseUrl + 'companyProduct/getProduct/' + id, {headers: this.httpOptions});
  }
}
