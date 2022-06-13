import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTownship'
})
export class SearchTownshipPipe implements PipeTransform 
{
  transform(townships:any, search:any){
    if(search == undefined){
      return townships;
    }else{
      return townships.filter( (township:any) => {
        return township.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
