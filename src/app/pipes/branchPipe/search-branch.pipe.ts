import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBranch'
})
export class SearchBranchPipe implements PipeTransform {

  transform(branches:any, search:any){
    if(search == undefined){
      return branches;
    }else{
      return branches.filter( (branch:any) => {
        return branch.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
