import { Component, OnInit } from '@angular/core';
import { BranchesAdminRestService } from 'src/app/services/branchesAdminRest/branches-admin-rest.service';
import { BranchModel } from 'src/app/models/branch.model';
import { TownShipAdminRestService } from 'src/app/services/townshipAdminRest/town-ship-admin-rest.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-branches-admin',
  templateUrl: './branches-admin.component.html',
  styleUrls: ['./branches-admin.component.css']
})
export class BranchesAdminComponent implements OnInit {
  branchesIsAdmin: any;
  branchViewIsAdmin: any;
  branchUpdate: any;
  branchIsAdmin: BranchModel;
  searchBrachAdmin: any;

  townships: any;
  companies: any;

  constructor(
    private branchesAdminRest: BranchesAdminRestService,
    private townshipAdminRest: TownShipAdminRestService,
    private companyRest: CompanyAdminRestService
        
  ) {
    this.branchIsAdmin = new BranchModel('', '', '', '', '', '');
   }

  ngOnInit(): void {
    this.getBranchesIsAdmin();
    this.getCompanies();
    this.getTownships();
  }

  getBranchesIsAdmin(){
    this.branchesAdminRest.getBranchesIsAdmin().subscribe({
      next: (res: any) => this.branchesIsAdmin = res.getBranchesIsAdmin,
      error: (err) => console.log(err)
    })
  }

  getBranchIsAdmin(id: string) {
    this.branchesAdminRest.getBranchIsAdmin(id).subscribe({
      next: (res: any) => {
        this.branchViewIsAdmin = res.getBranch,
        this.branchUpdate = res.getBranch
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getCompanies(){
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => this.companies = res.getCompany,
      error: (err) => console.log(err)
    })
  }

  getTownships(){
    this.townshipAdminRest.getTownships().subscribe({
      next: (res: any) => this.townships = res.townships,
      error: (err) => console.log(err)
    })
  }

  saveBranchIsAdmin(addBranchForm: any) {
    this.branchesAdminRest.saveBranchIsAdmin(this.branchIsAdmin).subscribe({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getBranchesIsAdmin();
          addBranchForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addBranchForm.reset();
        },
      })
  }


  updateBranch() {
    this.branchesAdminRest.updateBranchIsAdmin(this.branchUpdate._id, this.branchUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getBranchesIsAdmin();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }

  deleteBranchIsAdmin(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Branch?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.branchesAdminRest.deleteBranchIsAdmin(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.branchDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getBranchesIsAdmin();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getBranchesIsAdmin();
      } else if (result.isDenied) {
        Swal.fire('Branch Not Deleted', '', 'info')
      }
    })
  }
}