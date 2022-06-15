import { Component, OnInit } from '@angular/core';
import { BranchesAdminRestService } from 'src/app/services/branchesAdminRest/branches-admin-rest.service';
import { BranchModel } from 'src/app/models/branch.model';
import { TownShipAdminRestService } from 'src/app/services/townshipAdminRest/town-ship-admin-rest.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import Swal from 'sweetalert2';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';


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

  reset: any;
  branchProductView: any;
  updateProduct: any;
  newPrice: any;

  branchName: any
  branchID: any
  productsBranch: any;
  newPrices: any;
  branchView:any
  searchProducts: any;
  updateStock:any;

  showTableProducts: any;

  filterSearch: any
  filter:string = '';

  productsStockElder: any;
  productsStockMinor: any;
  productsNameUp: any;
  productsNameDown: any;
  allProducts:any;
  searchProduct: any;
  companyName: any;


  constructor(
    private branchesAdminRest: BranchesAdminRestService,
    private townshipAdminRest: TownShipAdminRestService,
    private companyRest: CompanyAdminRestService,
    private branchesRest: BranchesRestService,
    private productRest: ProductRestService
  ) {
    this.branchIsAdmin = new BranchModel('', '', '', '', '', '');
   }

  ngOnInit(): void {
    this.getBranchesIsAdmin();
    this.getCompanies();
    this.getTownships();
  }

  getBranchesIsAdmin()
  {
    this.productsBranch = this.reset;
    this.branchesAdminRest.getBranchesIsAdmin().subscribe({
      next: (res: any) => this.branchesIsAdmin = res.getBranchesIsAdmin,
      error: (err) => console.log(err)
    })
  }


  getBranchIsAdmin(id: string) {
    this.branchesAdminRest.getBranchIsAdmin(id).subscribe({
      next: (res: any) =>
      {
        this.companyName = res.getBranch.company.name
        this.branchID = res.getBranch._id
        this.branchViewIsAdmin = res.getBranch,
        this.branchUpdate = res.getBranch
        this.branchView = res.getBranch,
        this.branchName = res.getBranch.name
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getProductsBranch(id : string)
  {
    this.branchesRest.getProductsIsAdmin(id).subscribe({
      next: (res: any) => {
        this.productsBranch = res.productsBranch
        this.allProducts = res.productsBranch
        console.log(this.productsBranch)
        let allProducts = this.productsBranch
        var arrayPrices = [];
        for(var key=0; key<allProducts.length; key++)
        {
            var actualPrice = allProducts[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }    
        }
        this.newPrices = arrayPrices;
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

  viewProduct(product: string) 
  {
    let params = {product: product}
    this.productRest.getProductBranch(this.branchID, params).subscribe({
      next: (res: any) =>
      {
        this.branchProductView = res.productBranch
        this.updateProduct = res.productBranch
        var actualPrice = res.productBranch.price
        var stringPrice = actualPrice.toString();
        var checkPrice = stringPrice.includes(".")
        if(checkPrice == true)
        {
          this.newPrice = stringPrice
        }
        else if (checkPrice == false)
        {
          this.newPrice = stringPrice+'.00'
        } 
      },
      error: (err) => { alert(err.error.message) }
    }) 
  }

  deleteProduct(product: string) 
  {
    let params = {product: product}

    Swal.fire({
      title: 'Do you want to delete this Product of Branch?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed)
      {
        this.productRest.deleteProductBranch(this.branchID, params).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.deleteProduct.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getProductsBranch(this.branchID);
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getProductsBranch(this.branchID);
      } else if (result.isDenied) {
        Swal.fire('Product Not Deleted', '', 'info')
      }
    })
  }

  updateProductBranch(updateBranchProductForm:any) 
  {
    let params =
    {
      product: this.updateProduct.companyProduct._id,
      quantity: this.updateStock
    }
    this.productRest.updateProductBranch(this.branchID, params).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getProductsBranch(this.branchID);
        updateBranchProductForm.reset();
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

  getFilter(filter: any) {
    this.filterSearch = filter;
    this.filter = filter;
  }

  cleanTable()
  {
    this.productsStockElder = this.reset;
    this.productsStockMinor = this.reset;
    this.productsNameUp = this.reset
    this.productsNameDown = this.reset
    this.filterSearch = this.reset;
    this.allProducts = this.reset
    this.getProductsBranch(this.branchID);
    this.filter='Search...'
    this.searchProduct = this.reset;
  }


  getProductsBranchStockElder()
  {
    this.branchesRest.getProductStockElder(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productsStockMinor = this.reset;
        this.productsNameDown = this.reset;
        this.productsNameUp = this.reset;

        this.productsStockElder = res.productsBranch;
        this.allProducts = res.productsBranch

        let allProducts = this.allProducts
        var arrayPrices = [];
        for(var key=0; key<allProducts.length; key++)
        {
            var actualPrice = allProducts[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }    
        }
        this.newPrices = arrayPrices;
        this.newPrices = arrayPrices;
      },
      error: (err) => { alert(err.error.message) }
    })
  }


  getProductsBranchStockMinor()
  {
    this.branchesRest.getProductStockMinor(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productsStockElder = this.reset;
        this.productsNameDown = this.reset;
        this.productsNameUp = this.reset;

        this.productsStockMinor = res.productsBranch;
        this.allProducts = res.productsBranch

        let allProducts = this.allProducts
        var arrayPrices = [];
        for(var key=0; key<allProducts.length; key++)
        {
            var actualPrice = allProducts[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }    
        }
        this.newPrices = arrayPrices;
      },
      error: (err) => { alert(err.error.message) }
    })
  }


  getProductsNameUp()
  {
    this.branchesRest.getProductsNameUp(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productsStockElder = this.reset;
        this.productsStockMinor = this.reset;
        this.productsNameDown = this.reset;
        
        this.productsNameUp = res.arrayProducts
        this.allProducts = res.arrayProducts

        let allProducts = this.allProducts
        var arrayPrices = [];
        for(var key=0; key<allProducts.length; key++)
        {
            var actualPrice = allProducts[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }    
        }
        this.newPrices = arrayPrices;
      },
      error: (err) => { alert(err.error.message) }
    })
  }


  getProductsNameDown()
  {
    this.branchesRest.getProductsNameDown(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productsStockElder = this.reset;
        this.productsStockMinor = this.reset;
        this.productsNameUp = this.reset;

        this.productsNameDown = res.arrayProducts;
        this.allProducts = res.arrayProducts;

        let allProducts = this.allProducts
        var arrayPrices = [];
        for(var key=0; key<allProducts.length; key++)
        {
            var actualPrice = allProducts[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }    
        }
        this.newPrices = arrayPrices;
      },
      error: (err) => { alert(err.error.message) }
    })
  }


  showTable() 
  {
    this.showTableProducts = !this.showTableProducts;
  }
}