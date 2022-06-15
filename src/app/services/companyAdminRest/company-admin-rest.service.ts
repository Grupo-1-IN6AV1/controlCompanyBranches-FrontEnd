import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyAdminRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken(),
  });

  constructor
    (
      private companyRest: CompanyRestService,
      private http: HttpClient,
  ) { }


  //FUNCIONES DE ADMINISTRADOR//
  getCompanies() {
    return this.http.get(environment.baseUrl + 'company/getCompanies', { headers: this.httpOptions });
  }

  getCompany(id: string) {
    return this.http.get(environment.baseUrl + 'company/getCompany/' + id, { headers: this.httpOptions });
  }

  saveCompany(params: {}) {
    return this.http.post(environment.baseUrl + 'company/registerIsAdmin', params, { headers: this.httpOptions });
  }

  deleteCompany(id: string) {
    return this.http.delete(environment.baseUrl + 'company/deleteIsAdmin/' + id, { headers: this.httpOptions });
  }

  updateCompany(id: string, params: {}) {
    return this.http.put(environment.baseUrl + 'company/updateIsAdmin/' + id, params, { headers: this.httpOptions })
  }

  //FUNCIONES DE PROFILE//
  updateAccount(id: string, params: {}) {
    return this.http.put(environment.baseUrl + 'company/update/' + id, params, { headers: this.httpOptions })
  }

  deleteAccount(id: string, params:{}) {
    return this.http.post(environment.baseUrl + 'company/delete/' + id, params, { headers: this.httpOptions })
  }

  requestFiles(
    companyID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'company/uploadImage/' + companyID;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) { //AJAX status 4 = ok/done
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.companyRest.getToken());
      xhr.send(formData)
    })
  }
}
