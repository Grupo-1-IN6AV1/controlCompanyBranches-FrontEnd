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

}
