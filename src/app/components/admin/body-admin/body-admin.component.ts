import { Component, Input, OnInit } from '@angular/core';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
@Component({
  selector: 'app-body-admin',
  templateUrl: './body-admin.component.html',
  styleUrls: ['./body-admin.component.css']
})
export class BodyAdminComponent implements OnInit
{
  //Variables de TypeScript//
  user : any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  ngOnInit(): void 
  {
    this.userLogin();
  }

  constructor
  (
    private companyRest: CompanyAdminRestService,
    private company : CompanyRestService,
  )
  {
    
  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 480) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 480 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  
  logOut()
  {
    localStorage.clear(); 
    window.location.replace('/login')
  }

  userLogin()
  {
    this.companyRest.getCompany(this.company.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.user = res.getCompany;
        console.log(this.user);
      },
      error: (err) => {alert(err.error.message)}
    })
  }
}
