import { Component, OnInit } from '@angular/core';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { TypeCompanyRestService } from 'src/app/services/typeCompanyRest/type-company-rest.service';
import { BodyCompaniesComponent } from '../body-companies/body-companies.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  //Variables de TypeScript//
  companyLogin: any;
  typeCompanies: any

  identity: any;
  filesToUpload: any;
  password:any;
  reset:any;

  constructor
    (
      private companyRest: CompanyAdminRestService,
      private company: CompanyRestService,
      private typeCompanyRest: TypeCompanyRestService,
      private reloadBody: BodyCompaniesComponent,
      private router: Router,
    ) { }

  ngOnInit(): void {
    this.userLogin();
    this.getTypeCompanies();
  }

  getTypeCompanies() {
    this.typeCompanyRest.getTypeCompany().subscribe({
      next: (res: any) => this.typeCompanies = res.typeCompanyExist,
      error: (err) => console.log(err)
    })
  }

  userLogin() {
    this.companyRest.getCompany(this.company.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.companyLogin = res.getCompany;
        console.log(this.companyLogin);
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  updateCompany() {
    this.companyLogin.password = undefined;
    this.companyLogin.role = undefined;
    this.companyRest.updateAccount(this.companyLogin._id, this.companyLogin).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.userLogin();
        this.reloadBody.userLogin();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        this.userLogin();
      },
    })
  }

  deleteAccount() 
  {
    Swal.fire({
      title: 'Do you want to delete your Account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let params = {password:this.password};
        this.companyRest.deleteAccount(this.companyLogin._id, params).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.companyDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.password = this.reset;
            localStorage.clear();
            window.location.replace('/landigPage')
          },
          error: (err) => {Swal.fire({
            
            title: err.error.message || err.error,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
          this.password = this.reset;
        }
        })
      } else if (result.isDenied) {
        Swal.fire('Account Not Deleted', '', 'info')
        this.password = this.reset;
      }
      this.password = this.reset;
    })
  }

  cleanForm()
  {
    this.password = this.reset;
  }


  //UPLOAD IMAGE//
  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage() 
  {
    this.companyRest.requestFiles(this.company.getIdentity()._id, this.filesToUpload, 'image')
      .then((res: any) => {
        if (!res.error)
        {
          this.userLogin();
          this.reloadBody.userLogin();
          Swal.fire
            ({
              icon: 'success',
              title: 'Image added Successfully.',
              confirmButtonColor: '#28B463'
            });
        }
        else
        {
          console.log(res)
        }
      })
      .catch(error => 
        {
          Swal.fire({
            icon: 'error',
            title: error,
            confirmButtonColor: '#E74C3C'
          });
        })
  }
}
