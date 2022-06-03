import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import Swal from 'sweetalert2';

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


  constructor(
    private productRest: ProductRestService
  ) {
    this.product = new ProductModel('', '', '', 0, '', 0, '')
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productRest.getProduct().subscribe({
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

}
