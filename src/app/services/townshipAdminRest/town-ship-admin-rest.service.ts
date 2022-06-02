import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TownShipAdminRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken(),
  });

  constructor
  (
    private companyRest : CompanyRestService,
    private http: HttpClient
  ) { }

  getTownships()
  {
    return this.http.get(environment.baseUrl + 'township/getTownships', {headers: this.httpOptions});
  }

  saveTownship(params : {})
  {
    return this.http.post(environment.baseUrl + 'township/saveTownship', params,{headers: this.httpOptions});
  }

  getTownship(id: string)
  {
    return this.http.get(environment.baseUrl + 'township/getTownship/' + id, {headers: this.httpOptions});
  }

  deleteTownship(id : string)
  {
    return this.http.delete(environment.baseUrl + 'township/deleteTownship/' + id, {headers: this.httpOptions});
  }

  updateTownship(id : string, params:{})
  {
    return this.http.put(environment.baseUrl + 'township/updateTownship/' + id, params,{headers: this.httpOptions});
  }

}
