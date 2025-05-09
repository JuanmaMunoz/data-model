import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ICharData, IDataset } from '../../models/interfaces';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit {
  @Input() idChart: string = '';
  @Input() dataSets: IDataset[] = [];
  @ViewChild('canvas') canvas!: HTMLCanvasElement;
  @ViewChild('canvasLine') canvasLine!: HTMLCanvasElement;
  public chart: any = null;
  public chartLine: any = null;
  public chartData!: ICharData;

  ngAfterViewInit(): void {
    this.chartData = {
      labels: ['Adwards', 'Dribbling', 'Goal / Match %', 'Golden Balls', 'Max. speed km/h', 'Shot power', 'Win / Match %'],
      datasets: this.dataSets,
    };
    this.createChart();
    this.createChartLine();
  }

  private createChart() {
    if (this.chart) this.chart.destroy();
    const ctx = document.getElementById(this.idChart);

    this.chart = new Chart(ctx as any, {
      type: 'radar',
      data: this.chartData,
      options: {
        layout: {
          padding: 0,
        },
        scales: {
          r: {
            grid: {
              color: '#ed168fff',
              lineWidth: 0.3,
            },
            angleLines: {
              color: '#ed168fff',
              lineWidth: 0.3,
            },
            ticks: {
              color: '#ed168fff',
              backdropColor: 'transparent',
            },
            pointLabels: {
              color: '#4b2074ff',
              font: {
                size: 11.5,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          title: {
            font: {
              size: 30,
            },
          },
          legend: {
            //display: false,
            position: 'bottom',
          },
        },
      },
    });
  }

  private createChartLine(): void {
    if (this.chartLine) this.chart.destroy();
    const ctx = document.getElementById(this.idChart + 'line');
    this.chartLine = new Chart(ctx as any, {
      type: 'line',
      data: this.chartData,
    });
  }
}
