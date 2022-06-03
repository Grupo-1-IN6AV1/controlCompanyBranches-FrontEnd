import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';
import { CompanyAdminRestService } from 'src/app/services/companyAdminRest/company-admin-rest.service';

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
  productView:any;
  productProvider: any;
  searchProductProvider: any;
  companyName: any;
  showTableProducts: boolean = false;

  constructor(
    private productRest: ProductRestService,
    private company : CompanyRestService,
    private companyRest: CompanyAdminRestService,
    private _CargarScripts: CargarScriptsService,
  ) {
    this.product = new ProductModel('', '', '', 0, '', 0, ''),
    _CargarScripts.Carga(["datatable"]);
  }

  ngOnInit(): void {
    this.getProducts();
    this.userLogin();
  }

  getProducts() {
    this.productRest.getProductCompany().subscribe({
      next: (res: any) => this.allProducts = res.products,
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

  getProductProvider(providerName: string)
  {
    let data = {providerName: providerName}
    console.log(data);
    this.productRest.getProductProvider(data).subscribe({
      next: (res: any) => {
        this.searchProductProvider = res.product;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveProduct(addProductForm:any) {
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
      } else if (result.isDenied) 
      {
        Swal.fire('Product Not Deleted','', 'info')
      }
    })
  }

  updateProduct()
  {
    this.productRest.updateProduct(this.productUpdate._id, this.productUpdate).subscribe({
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

  userLogin()
  {
    this.companyRest.getCompany(this.company.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.companyName = res.getCompany.name;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  showTable()
  {
    this.showTableProducts =! this.showTableProducts;
  }

}
