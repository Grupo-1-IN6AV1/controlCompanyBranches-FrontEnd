import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { CompanyRestService } from '../services/companyRest/company-rest.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  
  constructor(
    private companyRest: CompanyRestService,
    public router: Router
  ){}

  canActivate(){
    if(this.companyRest.getIdentity().role === 'COMPANY'){
      return true; //next()
    }else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}
