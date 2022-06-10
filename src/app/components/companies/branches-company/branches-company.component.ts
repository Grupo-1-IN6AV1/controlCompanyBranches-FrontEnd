import { Component, OnDestroy, OnInit } from '@angular/core';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import { BranchModel } from 'src/app/models/branch.model';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';
import { TownShipAdminRestService } from 'src/app/services/townshipAdminRest/town-ship-admin-rest.service';

@Component({
  selector: 'app-branches-company',
  templateUrl: './branches-company.component.html',
  styleUrls: ['./branches-company.component.css']
})
export class BranchesCompanyComponent implements OnInit {

  //Variables de TypeScript//
  branches: any;
  branch: BranchModel;
  searchBranches: any;
  branchUpdate: any;
  branchView: any;
  townships: any;

  constructor
  (
    private branchRest: BranchesRestService,
    private townshipAdminRest: TownShipAdminRestService,
  )
  {
    this.branch = new BranchModel('', '', '', '', '', '')
  }

  ngOnInit(): void 
  {
    this.getBranches();
    this.getTownships();
  }

  getBranches()
  {
    this.branchRest.getBranches().subscribe({
      next: (res: any) => 
      {this.branches = res.getBranches},
      error: (err) => console.log(err)
    })
  }

  getBranch(id: string) {
    this.branchRest.getBranch(id).subscribe({
      next: (res: any) => {
        this.branchView = res.getBranch,
        this.branchUpdate = res.getBranch
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getTownships() 
  {
    this.townshipAdminRest.getTownships().subscribe({
      next: (res: any) => this.townships = res.townships,
      error: (err) => console.log(err)
    })
  }

  saveBranch(addBranchForm: any) {
    this.branchRest.saveBranch(this.branch).subscribe({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getBranches();
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
    this.branchRest.updateBranch(this.branchUpdate._id, this.branchUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getBranches();
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

  deleteBranch(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Branch?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.branchRest.deleteBranch(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.branchDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getBranches();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getBranches();
      } else if (result.isDenied) {
        Swal.fire('Branch Not Deleted', '', 'info')
      }
    })
  }

}
