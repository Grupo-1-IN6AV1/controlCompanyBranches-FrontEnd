import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTypeCompany'
})
export class SearchTypeCompanyPipe implements PipeTransform {

  transform(typeCompanies:any, search:any){
    if(search == undefined){
      return typeCompanies;
    }else{
      return typeCompanies.filter( (typeCompany:any) => {
        return typeCompany.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
