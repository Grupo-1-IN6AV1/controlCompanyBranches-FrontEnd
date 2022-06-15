import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesRestService {

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

  //FUNCIONES DE COMPANY//
  getBranches()
  {
    return this.http.get(environment.baseUrl + 'company/getBranches', {headers: this.httpOptions});
  }

  getBranch(id:string)
  {
    return this.http.get(environment.baseUrl + 'company/getBranch/' +id, {headers: this.httpOptions});
  }

  saveBranch(params:{})
  {
    return this.http.post(environment.baseUrl + 'branch/saveBranch', params, {headers: this.httpOptions});
  }

  deleteBranch(id:string)
  {
    return this.http.delete(environment.baseUrl + 'branch/deleteBranch/' + id, {headers: this.httpOptions});
  }

  updateBranch(id:string, params:{})
  {
    return this.http.put(environment.baseUrl + 'branch/updateBranch/'+id, params, {headers: this.httpOptions});
  }

  getProducts(id:string)
  {
    return this.http.get(environment.baseUrl + 'branch/getProductsBranch/' + id, {headers: this.httpOptions});
  }

  getProductsIsAdmin(id:string)
  {
    return this.http.get(environment.baseUrl + 'branch/getProductsBranchIsAdmin/' + id, {headers: this.httpOptions});
  }

  getProduct(id:string, params:{})
  {
    return this.http.post(environment.baseUrl + 'branch/getProductBranch/' + id, params,{headers: this.httpOptions});
  }

  getProductStockElder(id:string)
  {
    return this.http.get(environment.baseUrl + 'branch/getProductsBranchStockElder/' + id, {headers: this.httpOptions});
  }

  getProductStockMinor(id:string)
  {
    return this.http.get(environment.baseUrl + 'branch/getProductsBranchStockMinor/' + id, {headers: this.httpOptions});
  }

  getProductsNameUp(id:string)
  {
    return this.http.get(environment.baseUrl + 'branch/getProductsBranchNameUp/' + id, {headers: this.httpOptions});
  }

  getProductsNameDown(id:string)
  {
    return this.http.get(environment.baseUrl + 'branch/getProductsBranchNameDown/' + id, {headers: this.httpOptions});
  }

  saleProduct(id:string, params:{})
  {
    return this.http.put(environment.baseUrl + 'branch/salesProduct/' + id, params,{headers: this.httpOptions});
  }

  saleProductIsAdmin(id:string, params:{})
  {
    return this.http.put(environment.baseUrl + 'branch/salesProductIsAdmin/' + id, params,{headers: this.httpOptions});
  }

  getShoppingCart()
  {
    return this.http.get(environment.baseUrl + 'branch/getShoppingCarts', {headers: this.httpOptions});
  }

  generatePdf(params:{})
  {
    return this.http.post(environment.baseUrl + 'bill/createBill', params, {headers: this.httpOptions});
  }

  getPDF(fileName : string)
  {
    return this.http.get(environment.baseUrl + 'bill/getPDF/'+ fileName, {headers: this.httpOptions});
  }
}
