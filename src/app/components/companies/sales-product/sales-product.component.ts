import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import { SalesProductsCompanyComponent } from '../sales-products-company/sales-products-company.component';

@Component({
  selector: 'app-sales-product',
  templateUrl: './sales-product.component.html',
  styleUrls: ['./sales-product.component.css']
})
export class SalesProductComponent implements OnInit
{

  constructor
  (private branchRest: BranchesRestService)
  {
  }

  shoppingCart : any;
  quantityProduct : any;
  products: any;
  dataClient: any;

  ngOnInit(): void 
  {
    this.getShoppingCart();
  }

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
    let dpi = this.dataClient.dpi
    let params = {dpi}
      this.branchRest.generatePdf(params).subscribe({
      next: (res: any) => 
      {
        console.log(res)
      },
      error: (err) => { alert(err.error.message) }
    })
  }

}
