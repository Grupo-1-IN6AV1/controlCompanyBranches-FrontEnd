import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import { TypeCompanyRestService } from 'src/app/services/typeCompanyRest/type-company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit
{
  //Variables de TypeScript//
  companies: any;
  company: CompanyModel;
  searchCompany: any;
  companyView: any;
  companyUpdate: any;
  typeCompanies: any

  constructor
  (
    private companyRest: CompanyAdminRestService,
    private typeCompanyRest: TypeCompanyRestService
  )
  {
    this.company = new CompanyModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void 
  {
    this.getCompanies();
    this.getTypeCompanies();
  }

  //METÓDOS DEL CRUD DE COMPANIES//
  getCompanies() 
  {
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => this.companies = res.getCompany,
      error: (err) => console.log(err)
    })
  }

  getTypeCompanies()
  {
    this.typeCompanyRest.getTypeCompany().subscribe({
      next: (res:any)=> this.typeCompanies = res.typeCompanyExist,
      error: (err)=> console.log(err)
    })
  }

  getCompany(id: string) {
    this.companyRest.getCompany(id).subscribe({
      next: (res: any) => {
        this.companyView = res.getCompany;
        this.companyUpdate= res.getCompany;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveCompany(addCompanyForm: any) {
    this.companyRest.saveCompany(this.company).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getCompanies();
          addCompanyForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addCompanyForm.reset();
        },
      })
  }

  deleteCompany(id: string) 
  {

    Swal.fire({
      title: 'Do you want to delete this Company?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.companyRest.deleteCompany(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.companyDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getCompanies();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getCompanies();
      } else if (result.isDenied) 
      {
        Swal.fire('Company Not Deleted', '', 'info')
      }
    })
  }

  updateCompany()
  {
    this.companyUpdate.password = undefined;
    this.companyRest.updateCompany(this.companyUpdate._id, this.companyUpdate).subscribe({

      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getCompanies();
      },
      error: (err)=>
      {
        console.log(this.companyUpdate)
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }

}
