import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-product-branch-admin',
  templateUrl: './sale-product-branch-admin.component.html',
  styleUrls: ['./sale-product-branch-admin.component.css']
})
export class SaleProductBranchAdminComponent implements OnInit {

  ngOnInit(): void 
  {
    this.getShoppingCart();
  }

  constructor
  (
    private branchRest: BranchesRestService,
    private router: Router,
  )
  {

  }


  shoppingCart : any;
  quantityProduct : any;
  products: any;
  dataClient: any;

  fileName : any;
  pdf : any;


  getShoppingCart()
  {
    this.branchRest.getShoppingCart().subscribe({
      next: (res: any) => {
        this.shoppingCart = res.shoppingCarts;
        for(let shop of this.shoppingCart)
        {
          this.dataClient = shop;
          this.products = shop.products
          this.quantityProduct = shop.products.length
        }
      },
      error: (err) => { alert(err.error.message) }
    })
  }


  generatePDF()
  {
    Swal.fire({
      icon: 'success',
      title: 'Bill create Successfully.',
      confirmButtonColor: '#28B463',
      timer: 5000,
    }).then((result) => {
      if (result.isConfirmed)
      {
        let dpi = this.dataClient.dpi
        let params = {dpi}
        this.branchRest.generatePdf(params).subscribe({
          next: (res: any) =>
          {
            window.open("http://localhost:3000/Bill" + res.updateBill.numberBill);
            this.router.navigate(['/admin/salesProducts'])
          },
          error: (err) => { alert(err.error.message) }
        })
      }
    });
  }


}
