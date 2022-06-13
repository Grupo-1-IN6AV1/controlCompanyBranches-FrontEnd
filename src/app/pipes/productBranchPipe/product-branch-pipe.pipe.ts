import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProductBranchPipe'
})
export class ProductBranchPipePipe implements PipeTransform {

  transform(productsBranch:any, search:any){
    console.log(productsBranch)
    if(search == undefined){
      return productsBranch;
    }else{
      return productsBranch.filter( (productBranch:any) => {
        return productBranch.companyProduct.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
