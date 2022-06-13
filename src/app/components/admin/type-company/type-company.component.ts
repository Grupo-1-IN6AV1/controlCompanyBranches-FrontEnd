import { Component, OnInit } from '@angular/core';
import { TypeCompanyModel } from 'src/app/models/typeCompany.model';
import { TypeCompanyRestService } from 'src/app/services/typeCompanyRest/type-company-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-type-company',
  templateUrl: './type-company.component.html',
  styleUrls: ['./type-company.component.css']
})
export class TypeCompanyComponent implements OnInit {

  //Variables de TypeScript//
  typeCompanies: any; 
  typeCompany: TypeCompanyModel;
  searchTypeCompany: any;
  typeCompanyUpdate: any;

  constructor
  (
    private typeCompanyRest: TypeCompanyRestService,
  )
  {this.typeCompany = new TypeCompanyModel('','','')}

  ngOnInit(): void 
  {
    this.getTypeCompany();
  }

  //METÓDOS DEL CRUD DE COMPANIES//
  getTypeCompany() 
  {
    this.typeCompanyRest.getTypeCompany().subscribe({
      next: (res: any) => this.typeCompanies = res.typeCompanyExist,
      error: (err) => console.log(err)
    })
  }

  getTypeCompanies(id: string) {
    this.typeCompanyRest.getTypeCompanies(id).subscribe({
      next: (res: any) => {
        this.typeCompanyUpdate = res.typeCompanyExist
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveTypeCompany(addTypeCompanyForm: any) {
    this.typeCompanyRest.saveTypeCompany(this.typeCompany).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getTypeCompany();
          addTypeCompanyForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addTypeCompanyForm.reset();
        },
      })
  }

  deleteTypeCompany(id: string) 
  {
    Swal.fire({
      title: 'Do you want to delete this Tonwship?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeCompanyRest.deleteTypeCompany(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.typeCompanyDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTypeCompany();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getTypeCompany();
      } else if (result.isDenied) 
      {
        Swal.fire('Township Not Deleted', '', 'info')
      }
    })
  }

  updateTypeCompany()
  {
    this.typeCompanyRest.updateTypeCompany(this.typeCompanyUpdate._id, this.typeCompanyUpdate).subscribe({
      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getTypeCompany();
      },
      error: (err)=>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }

}
