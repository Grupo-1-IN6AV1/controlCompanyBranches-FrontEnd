import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CompanyRestService } from '../services/companyRest/company-rest.service';


import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private companyRest: CompanyRestService,
    public router: Router
    
  ){}
  
  canActivate(){
    if(this.companyRest.getIdentity().role === 'ADMIN'){
      return true; //next()
    }else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
    
}