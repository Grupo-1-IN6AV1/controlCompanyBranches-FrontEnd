import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardCompaniesComponent} from './components/compannies/dashboard-companies/dashboard-companies.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'companies', component: DashboardCompaniesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
