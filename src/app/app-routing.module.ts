import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import {SetComponentsComponent} from './components/companies/set-components/set-components.component';
import { Error404Component } from './components/error404/error404.component';
import { SetComponentsAdminComponent } from './components/admin/set-components-admin/set-components-admin.component';
import { CompaniesComponent } from './components/admin/companies/companies.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { TownshipsComponent } from './components/admin/townships/townships.component';
import { TypeCompanyComponent } from './components/admin/type-company/type-company.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { HomeCompanyComponent } from './components/companies/home-company/home-company.component';
import { ProductsCompanyComponent } from './components/companies/products-company/products-company.component';
import { BranchesCompanyComponent } from './components/companies/branches-company/branches-company.component';
import { ProfileCompanyComponent } from './components/companies/profile-company/profile-company.component';
import { BranchesAdminComponent } from './components/admin/branches-admin/branches-admin.component';
import { SalesProductsCompanyComponent } from './components/companies/sales-products-company/sales-products-company.component';
import { SalesProductComponent } from './components/companies/sales-product/sales-product.component';
import { SalesProductsAdminComponent } from './components/admin/sales-products-admin/sales-products-admin.component';
import { CompanyGuard } from './guards/company.guard';
import { AdminGuard } from './guards/admin.guard';
import { SaleProductBranchAdminComponent } from './components/admin/sale-product-branch-admin/sale-product-branch-admin.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'landigPage', component: LandingPageComponent},
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  //CONTROL DE RUTAS DE COMPANIES//
  {
    path: 'companies', canActivate:[CompanyGuard] ,component: SetComponentsComponent, 
    children:
    [
      { path: 'home', component: HomeCompanyComponent},
      { path: 'products', component: ProductsCompanyComponent},
      { path: 'branches', component: BranchesCompanyComponent},
      { path: 'profile', component: ProfileCompanyComponent},
      { path: 'salesProducts', component: SalesProductsCompanyComponent},
      { path: 'sales', component: SalesProductComponent},
    ]
  },
  //CONTROL DE RUTAS DE ADMIN//
  {
    path: 'admin', canActivate:[AdminGuard], component: SetComponentsAdminComponent, 
    children:
    [
      { path: 'home', component: HomeAdminComponent},
      { path: 'companies', component: CompaniesComponent },
      { path: 'townships', component: TownshipsComponent},
      { path: 'typeCompany', component: TypeCompanyComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'branches', component: BranchesAdminComponent},
      { path: 'salesProducts', component: SalesProductsAdminComponent},
      { path: 'sales', component: SaleProductBranchAdminComponent}
    ]
  },

  { path: '**', component: Error404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
