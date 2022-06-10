import { Component, OnInit } from '@angular/core';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import Swal from 'sweetalert2';
import { SalesProductComponent } from '../sales-product/sales-product.component';
@Component({
  selector: 'app-sales-products-company',
  templateUrl: './sales-products-company.component.html',
  styleUrls: ['./sales-products-company.component.css']
})
export class SalesProductsCompanyComponent implements OnInit 
{

  branches: any;
  searchBranches: any;
  branchView: any;
  branchID: any;
  branchName: any;
  

  productsBranch: any;
  productView: any;
  saleProduct: any
  productQuantity: any;
  productID: any;

  shoppingCart: any

  //DATA CLIENT//
  client: any;
  dpi: any;
  nit: any;

  
  constructor
  (
    private branchRest: BranchesRestService,  
  )
  { }

  ngOnInit(): void 
  {
    this.getBranches();
    this.getShoppingCart();
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
        this.branchView = res.getBranch
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getProductsBranch(id : string, name:any)
  {
    this.branchName = name;
    this.branchID = id;
    this.branchRest.getProducts(id).subscribe({
      next: (res: any) => {
        this.productsBranch = res.productsBranch
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getProductBranch(product:string)
  {
    this.branchRest.getProduct(this.branchID, {product}).subscribe({
      next: (res: any) => {
        this.productView = res.productBranch;
        this.saleProduct = res.productBranch;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getProductID(id: string)
  {
    this.productID = id
  }
  
  salesProducts(saleProductForm: any)
  {
    let quantity = this.productQuantity;
    let product = this.productID;
    let NIT = this.nit;
    let client = this.client;
    let dpi = this.dpi;

    let params = {product: product, quantity:quantity, NIT:NIT, client:client, dpi:dpi};
    this.branchRest.saleProduct(this.branchID, params).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getProductsBranch(this.branchID,'');
        this.shoppingCart = res.shoppingCart;
        saleProductForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        saleProductForm.reset();
      },
    })
  }

  getShoppingCart()
  {
    this.branchRest.getShoppingCart().subscribe({
      next: (res: any) => {
        this.shoppingCart = res.shoppingCarts;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

}
