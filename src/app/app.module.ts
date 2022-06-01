import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardCompaniesComponent } from './components/companies/dashboard-companies/dashboard-companies.component';
import { BodyCompaniesComponent } from './components/companies/body-companies/body-companies.component';
import { SetComponentsComponent } from './components/companies/set-components/set-components.component';
import { Error404Component } from './components/error404/error404.component';
import { BodyAdminComponent } from './components/admin/body-admin/body-admin.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { SetComponentsAdminComponent } from './components/admin/set-components-admin/set-components-admin.component';
import { CompaniesComponent } from './components/admin/companies/companies.component';
import { SearchCompanyPipe } from './pipes/companyPipe/search-company.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    RegisterComponent,
    DashboardCompaniesComponent,
    BodyCompaniesComponent,
    SetComponentsComponent,
    Error404Component,
    BodyAdminComponent,
    DashboardAdminComponent,
    SetComponentsAdminComponent,
    CompaniesComponent,
    SearchCompanyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
