import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //Variables de TypeScript//
  allProducts: any;
  product: ProductModel;
  searchProduct: any;
  productUpdate: any;
  productView:any;
  companies : any;
  showTableProducts: boolean = false;

  branchID : any;


  productsStockElder : any;
  productsStockMinor : any;
  productNameUp : any;
  productNameDown : any;
  reset: any;


  filterSearch: any
  filter:string = '';
  

  //Manejo de Quetzales//
  newPrices: any;



  constructor(
    private productRest: ProductRestService,
    private companyRest: CompanyAdminRestService,
    private _CargarScripts:CargarScriptsService,
  ) {
    this.product = new ProductModel('', '', '', 0, '', 0, '')
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCompanies();
  }

  getProducts() {
    this.productRest.getProduct().subscribe({
      next: (res: any) => 
      {
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

  getCompanies() 
  {
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => this.companies = res.getCompany,
      error: (err) => console.log(err)
    })
  }

  getProduct(id: string){
    this.productRest.getExactProduct(id).subscribe({
      next: (res: any) => {
        this.productView = res.products;
        this.productUpdate = res.products;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveProduct(addProductForm:any) {
    this.productRest.saveProductIsAdmin(this.product).subscribe
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

  deleteProduct(id: string) 
  {
    Swal.fire({
      title: 'Do you want to delete this Product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productRest.deleteProductIsAdmin(id).subscribe({
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
      } else if (result.isDenied) 
      {
        Swal.fire('Product Not Deleted','', 'info')
      }
    })
  }

  updateProduct()
  {
    this.productRest.updateProductIsAdmin(this.productUpdate._id, this.productUpdate).subscribe({
      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getProducts();
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

  showTable()
  {
    this.showTableProducts =! this.showTableProducts;
  }

  getProductsStockElder() {
    this.productRest.getProductsStockElderAdmin().subscribe({
      next: (res: any) => {
        this.productsStockElder = res.products,
        this.productsStockMinor = this.reset,
        this.productNameUp = this.reset;
        this.productNameDown = this.reset
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
    this.productRest.getProductsStockMinorAdmin().subscribe({
      next: (res: any) => {
        this.productsStockMinor = res.products,
        this.productsStockElder = this.reset,
        this.productNameUp = this.reset;
        this.productNameDown = this.reset
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
    this.productNameUp = this.reset
    this.productNameDown = this.reset
    this.filterSearch = this.reset;
    this.getProducts();
    this.filter='Search...'
    this.searchProduct = this.reset;
  }

  getProductsOderByUp(){
    this.productRest.getProductsOderByUpAdmin().subscribe({
      next: (res:any)=>
      {
        this.productsStockElder = this.reset
        this.productsStockMinor = this.reset
        this.productNameDown = this.reset
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

  getProductsOderByDown(){
    this.productRest.getProductsOderByDownAdmin().subscribe({
      next: (res:any)=>
      {
        this.productsStockElder = this.reset
        this.productsStockMinor = this.reset
        this.productNameUp = this.reset
        this.productNameDown = res.products
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

  getFilter(filter: any) {
    this.filterSearch = filter;
    this.filter = filter;
  }

}
