import { Component, OnInit } from '@angular/core';
import { BranchesRestService } from 'src/app/services/branchesRest/branches-rest.service';

@Component({
  selector: 'app-sales-products-company',
  templateUrl: './sales-products-company.component.html',
  styleUrls: ['./sales-products-company.component.css']
})
export class SalesProductsCompanyComponent implements OnInit 
{

  branches: any;
  searchBranches: any;
  branchView: any;

  productsBranch: any;
  
  constructor
  (private branchRest: BranchesRestService)
  { }

  ngOnInit(): void 
  {
    this.getBranches();
  }

  getBranches()
  {
    this.branchRest.getBranches().subscribe({
      next: (res: any) => 
      {this.branches = res.getBranches},
      error: (err) => console.log(err)
    })
  }

  getBranch(id: string) {
    this.branchRest.getBranch(id).subscribe({
      next: (res: any) => {
        this.branchView = res.getBranch
      },
      error: (err) => { alert(err.error.message) }
    })
  }

  getProductsBranch(id : string)
  {
    this.branchRest.getProducts(id).subscribe({
      next: (res: any) => {
        this.productsBranch = res.productsBranch
      },
      error: (err) => { alert(err.error.message) }
    })
  }

}
