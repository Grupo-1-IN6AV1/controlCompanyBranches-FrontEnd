import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { ThisReceiver } from '@angular/compiler';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  constructor(private productRest : ProductRestService)
  {
  }

  myChart:any=Chart;
  canvas: any;
  ctx: any;
  chart:any
  productGraphic: any;

  graficBar() 
  {
    this.productRest.productGraphic('62a27b89fd07b48b5d095fde').subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const setDataSets = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var data =  this.productGraphic[key];
          setDataSets.push({label:data.companyProduct.name, data:[data.sales]});
        }

        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx,
        {
          type: 'bar',
          data:
          {
              labels: ['ejemplo'],
              datasets: setDataSets,
          }
        });
      },
      error: (err) => {console.log(err)}
    })
  }
  

  graficDonut()
  {

    this.productRest.productGraphic('62a27b89fd07b48b5d095fde').subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const labels = []
        const data = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var dataProduct =  this.productGraphic[key];
          labels.push(dataProduct.companyProduct.name);
          data.push(dataProduct.sales);
        }
        
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: 
            [{
                data: data,
            }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'ejemplo'
              }
          }
      }
      });

      },
      error: (err) => {console.log(err)}
    })
  }

  graficPie()
  {
    this.productRest.productGraphic('62a27b89fd07b48b5d095fde').subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const labels = []
        const data = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var dataProduct =  this.productGraphic[key];
          labels.push(dataProduct.companyProduct.name);
          data.push(dataProduct.sales);
        }
        
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: 
            [{
                data: data,
            }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'ejemplo'
              }
          }
      }
      });

      },
      error: (err) => {console.log(err)}
    })
  }


  graficLine()
  {
    this.productRest.productGraphic('62a27b89fd07b48b5d095fde').subscribe({
      next: (res: any) => 
      {
        this.productGraphic = res.productsSales;
        const labels = []
        const data = []

        for (var key=0; key < this.productGraphic.length; key ++)
        {
          var dataProduct =  this.productGraphic[key];
          labels.push(dataProduct.companyProduct.name);
          data.push(dataProduct.sales);
        }
        
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: 
            [{
                label: 'ejemplo',
                data: data,
            }]
        }
      });

      },
      error: (err) => {console.log(err)}
    })
  }

  ngOnDestroy()
  {
    if (this.chart) {this.chart.destroy();}
  }

}