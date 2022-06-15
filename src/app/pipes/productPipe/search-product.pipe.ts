import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(allproducts:any, search:any)
  { 
    //Todos los Productos//
    if(search.searchProduct == undefined && search.filterSearch =='')
    {
      return allproducts;
    }
    //Borrar Búsqueda//
    else if(search.searchProduct == '' && search.filterSearch == '')
    {
      return allproducts;
    }
    if(search.searchProduct == undefined && search.filterSearch ==undefined)
    {
      return allproducts;
    }
    if(search.searchProduct == '' && search.filterSearch ==undefined)
    {
      return allproducts;
    }
    else if(search.searchProduct && search.filterSearch == ''){
      return allproducts.filter( (product:any) => {
        return product.name.toLowerCase().includes(search.searchProduct.toLowerCase());
      })
    }
    else if(search.searchProduct && search.filterSearch == undefined){
      return allproducts.filter( (product:any) => {
        return product.name.toLowerCase().includes(search.searchProduct.toLowerCase());
      })
    }
    else if(search.searchProduct == undefined && (search.filterSearch==''||search.filterSearch=='name'||search.filterSearch=='provider')){
      return allproducts.filter( (product:any) => {
        return product.name.toLowerCase().includes(search.searchProduct.toLowerCase());
      })
    }
    //Productos por Nombres//
    else if (search.searchProduct != undefined && search.filterSearch=='name'){
      return allproducts.filter( (product:any) => {
        return product.name.toLowerCase().includes(search.searchProduct.toLowerCase());
      })
     }
    //Productos por Proveedor//
     else if (search.searchProduct != undefined && search.filterSearch=='provider'){
      return allproducts.filter( (product:any) => {
        return product.providerName.toLowerCase().includes(search.searchProduct.toLowerCase());
      })
     }
  }

}
