import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';



@Injectable({
  providedIn: 'root'
})
export class BranchesAdminRestService {
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


  getBranchesIsAdmin(){
    return this.http.get(environment.baseUrl + 'company/getBranchesIsAdmin/', {headers: this.httpOptions});
  }

  getBranchIsAdmin(id: string){
    return this.http.get(environment.baseUrl + 'company/getBranchIsAdmin/' + id ,{headers: this.httpOptions});
  }

  saveBranchIsAdmin(params:{})
  {
    return this.http.post(environment.baseUrl + 'branch/saveBranchIsAdmin', params, {headers: this.httpOptions});
  }

  deleteBranchIsAdmin(id:string)
  {
    return this.http.delete(environment.baseUrl + 'branch/deleteBranchIsAdmin/' + id, {headers: this.httpOptions});
  }

  updateBranchIsAdmin(id:string, params:{})
  {
    return this.http.put(environment.baseUrl + 'branch/updateBranchIsAdmin/'+ id, params, {headers: this.httpOptions});
  }

}