import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(allproducts:any, search:any){
    if(search == undefined){
      return allproducts;
    }else{
      return allproducts.filter( (product:any) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
