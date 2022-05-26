import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';

@Component({
  selector: 'app-dashboard-companies',
  templateUrl: './dashboard-companies.component.html',
  styleUrls: ['./dashboard-companies.component.css']
})
export class DashboardCompaniesComponent implements OnInit {

  constructor
  (
    private _CargarScripts:CargarScriptsService,
  ) 
  {
    _CargarScripts.Carga(["dashboard"])
  }

  ngOnInit(): void {
  }

}
