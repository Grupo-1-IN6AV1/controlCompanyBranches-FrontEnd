import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCompany'
})
export class SearchCompanyPipe implements PipeTransform {

  transform(companies:any, search:any){
    if(search == undefined){
      return companies;
    }else{
      return companies.filter( (company:any) => {
        return company.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
