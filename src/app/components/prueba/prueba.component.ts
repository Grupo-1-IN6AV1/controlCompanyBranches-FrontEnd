import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { ThisReceiver } from '@angular/compiler';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  myChart:any=Chart;
  canvas: any;
  ctx: any;
  chart:any

  graficLine() 
  {
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: ["New", "In Progress", "On Hold"],
            datasets: [{
                label: '# of Votes',
                data: [1,2,3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {}
      });
    }
  

  graficDonut()
  {
    this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
            labels: ["New", "In Progress", "On Hold"],
            datasets: [{
                label: '# of Votes',
                data: [1,2,3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {}
      });
  }

  graficPie()
  {
    this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'pie',
        data: {
            labels: ["New", "In Progress", "On Hold"],
            datasets: [{
                label: '# of Votes',
                data: [1,2,3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 4
            }]
        },
        options: {}
      });
  }

  ngOnDestroy()
  {
    if (this.chart) {this.chart.destroy();}
  }

}