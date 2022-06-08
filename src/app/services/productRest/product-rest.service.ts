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

  getExactProduct(id:string)
  {
    return this.http.get(environment.baseUrl + 'companyProduct/getProduct/' + id, {headers: this.httpOptions});
  }

  getProductProvider(params:{})
  {
    return this.http.post(environment.baseUrl + 'companyProduct/getProductProvider', params ,{headers: this.httpOptions});
  }

  getProductsStockElder()
  {
    return this.http.get(environment.baseUrl + 'companyProduct/getProductStockElder', {headers: this.httpOptions});
  }

  getProductsStockMinor()
  {
    return this.http.get(environment.baseUrl + 'companyProduct/getProductStockMinor', {headers: this.httpOptions});
  }

  //ADMIN//
  saveProductIsAdmin(params:{}){
    return this.http.post(environment.baseUrl + 'companyProduct/saveProductIsAdmin', params ,{headers: this.httpOptions});
  }

  updateProductIsAdmin(id : string, params:{})
  {
    return this.http.put(environment.baseUrl + 'companyProduct/updateProductIsAdmin/' + id, params,{headers: this.httpOptions});
  }

  deleteProductIsAdmin(id : string)
  {
    return this.http.delete(environment.baseUrl + 'companyProduct/deleteProductisAdmin/' + id, {headers: this.httpOptions});
  }


  //COMPANY//

  getProductCompany(){
    return this.http.get(environment.baseUrl + 'companyProduct/getProductsCompany', {headers: this.httpOptions});
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

}
