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


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'landigPage', component: LandingPageComponent},
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  //CONTROL DE RUTAS DE COMPANIES//
  {
    path: 'companies', component: SetComponentsComponent, 
    children:
    [
      { path: 'home', component: HomeCompanyComponent},
      { path: 'products', component: ProductsCompanyComponent},
    ]
  },
  //CONTROL DE RUTAS DE ADMIN//
  {
    path: 'admin', component: SetComponentsAdminComponent, 
    children:
    [
      { path: 'home', component: HomeAdminComponent},
      { path: 'companies', component: CompaniesComponent },
      { path: 'townships', component: TownshipsComponent},
      { path: 'typeCompany', component: TypeCompanyComponent},
      { path: 'products', component: ProductsComponent},
    ]
  },

  { path: '**', component: Error404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
