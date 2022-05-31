import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import {SetComponentsComponent} from './components/companies/set-components/set-components.component';

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
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'landingPage', component: LandingPageComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
