import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  company:CompanyModel;


  constructor(
    private companyRest: CompanyRestService,
    private router: Router
  ) { 
    this.company = new CompanyModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    
  }

  login()
  {
    this.companyRest.login(this.company).subscribe({
      next: (res:any)=>{
        localStorage.setItem('identity', JSON.stringify(res.already));
        localStorage.setItem('token', res.token);
        
        Swal.fire({
          icon:'success',
          title: res.message,
          html:'Welcome <b>'+ res.already.username+'</b>',
          confirmButtonColor: '#28B463'
        })

        const verificarAdmin = res.already.role;
        //VERIFICA A DONDE LLEVARME//
        if(verificarAdmin == 'ADMIN')
         {this.router.navigate(['/admin/home']);}
        else
        {this.router.navigate(['/companies/home'])}
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }
}
