import { Component, OnDestroy, OnInit } from '@angular/core';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import { BranchModel } from 'src/app/models/branch.model';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';
import { TownShipAdminRestService } from 'src/app/services/townshipAdminRest/town-ship-admin-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';

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
  branchName: any;
  companyName: any;
  branchID: any;
  branchProductView: any;
  updateStock: any;

  reset: any;


  //Productos//
  newPrices: any;
  newPrice: any;
  productsBranch: any;
  searchProducts: any;
  allProducts: any;
  showTableProducts: any;
  updateProduct: any;
  productBranchUpdate: any;
  productsStockElder: any;
  productsStockMinor: any;
  productsNameUp: any;
  productsNameDown: any;


  filterSearch: any
  filter:string = '';
  searchProduct: any;

  constructor
  (
    private branchRest: BranchesRestService,
    private townshipAdminRest: TownShipAdminRestService,
    private company: CompanyRestService,
    private companyRest: CompanyAdminRestService,
    private productRest: ProductRestService
  )
  {
    this.branch = new BranchModel('', '', '', '', '', '')
  }

  ngOnInit(): void 
  {
    this.getBranches();
    this.getTownships();
    this.userLogin();
    this.getFilter('');
  }

  userLogin() {
    this.companyRest.getCompany(this.company.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.companyName = res.getCompany.name;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getBranches()
  {
    this.showTableProducts = this.reset;
    this.productsBranch = this.reset;
    this.branchRest.getBranches().subscribe({
      next: (res: any) => 
      {this.branches = res.getBranches},
      error: (err) => console.log(err)
    })
  }

  getBranch(id: string) 
  {
    this.branchID = id;
    this.branchRest.getBranch(id).subscribe({
      next: (res: any) => {
        this.branchView = res.getBranch,
        this.branchUpdate = res.getBranch
        this.branchName = res.getBranch.name
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

  getProductsBranch(id : string)
  {
    this.branchRest.getProducts(id).subscribe({
      next: (res: any) => {
        this.allProducts = res.productsBranch;
        this.productsBranch = res.productsBranch
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

  getProductsBranchStockElder()
  {
    this.branchRest.getProductStockElder(this.branchID).subscribe({
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
    this.branchRest.getProductStockMinor(this.branchID).subscribe({
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
    this.branchRest.getProductsNameUp(this.branchID).subscribe({
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
    this.branchRest.getProductsNameDown(this.branchID).subscribe({
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

  showTable() 
  {
    this.showTableProducts = !this.showTableProducts;
  }

}
