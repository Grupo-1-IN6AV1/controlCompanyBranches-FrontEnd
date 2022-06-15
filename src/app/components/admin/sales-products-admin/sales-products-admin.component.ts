import { Component, OnDestroy, OnInit } from '@angular/core';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
import { BranchesAdminRestService } from 'src/app/services/branchesAdminRest/branches-admin-rest.service';

@Component({
  selector: 'app-sales-products-admin',
  templateUrl: './sales-products-admin.component.html',
  styleUrls: ['./sales-products-admin.component.css']
})
export class SalesProductsAdminComponent implements OnInit {

  branches: any;
  searchBranches: any;
  searchProducts: any;
  branchView: any;
  branchID: any;
  branchName: any;
  companyName: any;

  reset:any
  

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

  //QUETZALES
  newPrices: any;
  newPrice: any;

  company: any;
  
  constructor
  (
    private branchRest: BranchesRestService, 
    private branchRestAdmin: BranchesAdminRestService, 
    private productRest: ProductRestService,
  )
  { }

  ngOnInit(): void 
  {
    this.getBranches();
    this.getShoppingCart();
  }

  getBranches()
  {
    this.productsBranch = this.reset
    this.company = this.reset
    this.branchRestAdmin.getBranchesIsAdmin().subscribe({
      next: (res: any) => 
      {this.branches = res.getBranchesIsAdmin},
      error: (err) => console.log(err)
    })
  }

  getBranch(id: string) {
    this.branchRestAdmin.getBranchIsAdmin(id).subscribe({
      next: (res: any) => {
        this.branchView = res.getBranch
        this.companyName = res.getBranch.company.name
        this.company = res.getBranch.company._id
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getProductsBranch(id : string, name:any)
  {
    this.branchName = name;
    this.branchID = id;
    this.branchRest.getProductsIsAdmin(id).subscribe({
      next: (res: any) => {
        this.productsBranch = res.productsBranch
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

  getProductBranch(product:string)
  {
    this.branchRest.getProduct(this.branchID, {product}).subscribe({
      next: (res: any) => {
        this.productView = res.productBranch;
        this.saleProduct = res.productBranch;
        var actualPrice = res.productBranch.price;
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
    let company = this.company

    let params = {product: product, quantity:quantity, NIT:NIT, client:client, dpi:dpi, company:company};
    this.branchRest.saleProductIsAdmin(this.branchID, params).subscribe({
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


  //MANEJO DE LAS GRÁFICAS//
  canvas: any;
  ctx: any;
  chart:any
  productGraphic: any;
  productTable: any;
  viewMostSalesProducts: boolean = false;
  show: boolean = false;
  tableProducts: boolean = false;
  graphicProducts: boolean = false;

  graficBar() 
  {
    this.productRest.productGraphic(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const setDataSets = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var data =  this.productGraphic[key];
          setDataSets.push({label:data.companyProduct.name, data:[data.sales]});
        }

        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx,
        {
          type: 'bar',
          data:
          {
              labels: ['Most Sales Products of: "' + this.companyName + ' | ' + this.branchName + '"'],
              datasets: setDataSets,
          }
        });
      },
      error: (err) => {console.log(err)}
    })
  }
  

  graficDonut()
  {
    this.productRest.productGraphic(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const labels = []
        const data = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var dataProduct =  this.productGraphic[key];
          labels.push(dataProduct.companyProduct.name);
          data.push(dataProduct.sales);
        }
        
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: 
            [{
                data: data,
            }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Most Sales Products of: "' + this.companyName + ' | ' + this.branchName + '"'
              }
          }
      }
      });

      },
      error: (err) => {console.log(err)}
    })
  }

  graficPie()
  {
    this.productRest.productGraphic(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const labels = []
        const data = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var dataProduct =  this.productGraphic[key];
          labels.push(dataProduct.companyProduct.name);
          data.push(dataProduct.sales);
        }
        
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: 
            [{
                data: data,
            }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Most Sales Products of: "' + this.companyName + ' | ' + this.branchName + '"'
              }
          }
      }
      });

      },
      error: (err) => {console.log(err)}
    })
  }


  graficLine()
  {
    this.productRest.productGraphic(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const labels = []
        const data = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var dataProduct =  this.productGraphic[key];
          labels.push(dataProduct.companyProduct.name);
          data.push(dataProduct.sales);
        }
        
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: 
            [{
                label: 'Most Sales Products of: "' + this.companyName + ' | ' + this.branchName + '"',
                data: data,
            }]
        }
      });

      },
      error: (err) => {console.log(err)}
    })
  }

  table()
  {
    this.productRest.productGraphic(this.branchID).subscribe({
      next: (res: any) => 
      {
        this.productTable = res.productsSales;
        let allProducts = this.productTable
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
      error: (err) => {console.log(err)}
    })
  }


  ngOnDestroy()
  {
    if (this.chart) {this.chart.destroy();}
  }

  mostSalesProducts()
  {
    this.viewMostSalesProducts =! this.viewMostSalesProducts;
  }

  viewProducts()
  {
    this.viewMostSalesProducts =! this.viewMostSalesProducts;
  }

}
