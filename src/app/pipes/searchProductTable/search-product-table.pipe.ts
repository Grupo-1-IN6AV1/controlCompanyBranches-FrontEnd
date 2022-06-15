import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProductTable'
})
export class SearchProductTablePipe implements PipeTransform {

  transform(productsBranch:any, search:any)
  {
    console.log(search)
    if(search.searchProducts == undefined){
      return productsBranch;
    }
    else if(search.searchProducts == '' && search.filterSearch == '')
    {
      return productsBranch;
    }
    else if(search.searchProducts == '' && search.filterSearch == undefined)
    {
      return productsBranch;
    }
    else if(search.searchProducts == '' && (search.filterSearch == 'provider' || search.filterSearch=='name'))
    {
      return productsBranch;
    }
    else if(search.searchProducts && search.filterSearch == ''){
      return productsBranch.filter( (productBranch:any) => {
        return productBranch.companyProduct.name.toLowerCase().includes(search.searchProducts.toLowerCase());
      })
    }
    else if(search.searchProducts != '' && search.filterSearch == undefined)
    {
      return productsBranch.filter( (productBranch:any) => {
        return productBranch.companyProduct.name.toLowerCase().includes(search.searchProducts.toLowerCase());
      })
    }
    else if(search.searchProducts == '' && (search.filterSearch == 'provider' || search.filterSearch=='name'))
    {
      return productsBranch;
    }
    else if(search.searchProducts != '' && search.filterSearch == 'name')
    {
      return productsBranch.filter( (productBranch:any) => {
        return productBranch.companyProduct.name.toLowerCase().includes(search.searchProducts.toLowerCase());
      })
    }
    else if(search.searchProducts != '' && search.filterSearch == 'provider')
    {
      return productsBranch.filter( (productBranch:any) => {
        return productBranch.companyProduct.providerName.toLowerCase().includes(search.searchProducts.toLowerCase());
      })
    }
  }

}
