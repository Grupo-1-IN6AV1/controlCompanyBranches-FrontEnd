import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { TypeCompanyRestService } from 'src/app/services/typeCompanyRest/type-company-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  company:CompanyModel;
  confirmPassword : string = '';
  timer : any;
  typeCompany: any;
  constructor
  (
    private companyRest : CompanyRestService,
    private typeCompanyRest: TypeCompanyRestService,
    private router : Router
  )
  {
    this.company = new CompanyModel('', '', '', '', '', '', '', '6286cdf8de9525757a29b3ce');
  }

  ngOnInit(): void {
    this.getTypeCompanies();
  }

  getTypeCompanies(){
    this.typeCompanyRest.getTypeCompany().subscribe({
      next: (res: any) => this.typeCompany = res.typeCompanyExist,
      error: (err) => console.log(err)
    })
  }

  async checkPassword()
  {
    clearTimeout(this.timer);
    this.timer = await setTimeout(()=>
    {
      if(this.company.password != '')
      {
        if (this.confirmPassword != this.company.password) 
        {
          Swal.fire({
            icon:'error',
            title: 'Password do not Match',
            html:'Try Again',
            confirmButtonColor: '#E74C3C'
          })
        }
        else 
        {
          Swal.fire({
            icon:'success',
            title: 'Passwords Match',
            confirmButtonColor: '#28B463'
          })
        }
      }
      else
      {
        Swal.fire({
          icon:'info',
          title: 'Set value in input Password',
          confirmButtonColor: '#0D6EFD'
        })
      }
    }, 800);
  }

  register()
  {
    //console.log(this.user);
    //let message : string = 'Mensaje desde el componente pero enviado desde el servicio'
    //this.userRest.test(message);
    //this.userRest.testHttp().subscribe((response:any)=>{alert(response.message)});
    /*this.userRest.testHttp().subscribe
    ({
      next : (response : any) => {alert(response.message)},
      error: (error) => {console.log(error)}
    })*/
    this.companyRest.register(this.company).subscribe
    ({
      
      next : (res : any) => 
      {
        Swal.fire({
          title: res.message,
          html:'Already can Login now.',
          confirmButtonColor: '#28B463'
        })
        this.router.navigateByUrl('/login')
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    });
  }

}