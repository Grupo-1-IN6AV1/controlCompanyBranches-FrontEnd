import { Component, OnInit } from '@angular/core';
import { TownShipAdminRestService } from 'src/app/services/townshipAdminRest/town-ship-admin-rest.service';
import { TownshipModel } from 'src/app/models/township.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-townships',
  templateUrl: './townships.component.html',
  styleUrls: ['./townships.component.css']
})
export class TownshipsComponent implements OnInit 
{

  //Variables de TypeScript//
  townships: any; 
  township: TownshipModel;
  searchTownship: any;
  townshipUpdate: any;

  constructor
  (
    private townshipAdminRest: TownShipAdminRestService,
  )
  {this.township = new TownshipModel('','')}

  ngOnInit(): void 
  {
    this.getTownships();
  }

  //METÓDOS DEL CRUD DE COMPANIES//
  getTownships() 
  {
    this.townshipAdminRest.getTownships().subscribe({
      next: (res: any) => this.townships = res.townships,
      error: (err) => console.log(err)
    })
  }

  getTownship(id: string) {
    this.townshipAdminRest.getTownship(id).subscribe({
      next: (res: any) => {
        this.townshipUpdate= res.township;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveTownship(addTownshipForm: any) {
    this.townshipAdminRest.saveTownship(this.township).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getTownships();
          addTownshipForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addTownshipForm.reset();
        },
      })
  }

  deleteTownship(id: string) 
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
        this.townshipAdminRest.deleteTownship(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.townshipDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTownships();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getTownships();
      } else if (result.isDenied) 
      {
        Swal.fire('Township Not Deleted', '', 'info')
      }
    })
  }

  updateTownship()
  {
    this.townshipAdminRest.updateTownship(this.townshipUpdate._id, this.townshipUpdate).subscribe({
      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getTownships();
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
