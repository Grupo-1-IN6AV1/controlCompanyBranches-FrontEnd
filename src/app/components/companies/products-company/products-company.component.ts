import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';

@Component({
  selector: 'app-products-company',
  templateUrl: './products-company.component.html',
  styleUrls: ['./products-company.component.css']
})
export class ProductsCompanyComponent implements OnInit {

  //Variables de TypeScript//
  allProducts: any;
  product: ProductModel;
  searchProduct: any;
  productUpdate: any;
  productView: any;
  sendProduct: any;
  productProvider: any;
  searchProductProvider: any;
  filterSearch: any
  filter:string = '';
  productsStockElder: any
  productsStockMinor: any
  reset: any;
  companyName: any;
  showTableProducts: boolean = false;
  productNameUp: any;
  branches: any;

  //ENVIAR PRODUCTOS A SUCURSAL//
  productBranch: any;
  productQuantity: any

  //SETEO DE QUETZALES//
  newPrices: any;
  newPrice : any;

  constructor(
    private productRest: ProductRestService,
    private company: CompanyRestService,
    private companyRest: CompanyAdminRestService,
    private _CargarScripts: CargarScriptsService,
    private branchRest: BranchesRestService
  )
  {
    this.product = new ProductModel('', '', '', 0, '', 0, ''),
    _CargarScripts.Carga(["datatable"]);
  }

  ngOnInit(): void {
    this.getProducts();
    this.userLogin();
    this.getFilter('');
    this.getBranch();
  }

  getProducts() {
    this.productRest.getProductCompany().subscribe({
      next: (res: any) => 
      {this.allProducts = res.products
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
      error: (err) => console.log(err)
    })
  }

  getProduct(id: string) {
    this.productRest.getExactProduct(id).subscribe({
      next: (res: any) => {
        this.productView = res.products;
        this.productUpdate = res.products;
        this.sendProduct = res.products;
        var actualPrice = res.products.price;
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

  getProductProvider(providerName: string) {
    let data = { providerName: providerName }
    this.productRest.getProductProvider(data).subscribe({
      next: (res: any) => {
        this.searchProductProvider = res.product;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  saveProduct(addProductForm: any) {
    this.productRest.saveProduct(this.product).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getProducts();
          addProductForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addProductForm.reset();
        },
      })
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Do you want to delete this Product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productRest.deleteProduct(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.productDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getProducts();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getProducts();
      } else if (result.isDenied) {
        Swal.fire('Product Not Deleted', '', 'info')
      }
    })
  }

  updateProduct() {
    this.productRest.updateProduct(this.productUpdate._id, this.productUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getProducts();
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

  userLogin() {
    this.companyRest.getCompany(this.company.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.companyName = res.getCompany.name;
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  showTable() {
    this.showTableProducts = !this.showTableProducts;
  }

  getFilter(filter: any) {
    this.filterSearch = filter;
    this.filter = filter;
  }

  getProductsStockElder() {
    this.productRest.getProductsStockElder().subscribe({
      next: (res: any) => {
        this.productsStockElder = res.products,
        this.productsStockMinor = this.reset,
        this.productNameUp = this.reset;
        this.allProducts = res.products
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
      error: (err) => console.log(err)
    })
  }

  getProductsStockMinor() {
    this.productRest.getProductsStockMinor().subscribe({
      next: (res: any) => {
        this.productsStockMinor = res.products,
        this.productsStockElder = this.reset,
        this.productNameUp = this.reset;
        this.allProducts = res.products
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
      error: (err) => console.log(err)
    })
  }

  cleanTable()
  {
    this.productsStockElder = this.reset;
    this.productsStockMinor = this.reset;
    this.filterSearch = this.reset;
    this.getProducts();
    this.filter='Search...'
    this.searchProduct = this.reset;
  }

  getProductsOderByUp(){
    this.productRest.getProductsOderByUp().subscribe({
      next: (res:any)=>
      {
        this.productsStockElder = this.reset
        this.productsStockMinor = this.reset
        this.productNameUp = res.products
        this.allProducts = res.products
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
      error: (err) => console.log(err)
    })
  }

  getBranch()
  {
    this.branchRest.getBranches().subscribe({
      next: (res: any) => 
      {this.branches = res.getBranches},
      error: (err) => console.log(err)
    })
  }

  sendProductBranch(addProductBranchForm: any)
  {
    let cantidad = this.productQuantity;
    let product = this.sendProduct._id
    let params = {cantidad: cantidad, product:product};
    this.productRest.addProductBranch(this.productBranch, params).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        addProductBranchForm.reset();
        this.getProducts();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addProductBranchForm.reset();
      },
    })
  }

}
