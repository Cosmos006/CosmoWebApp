import { Component, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  // @ViewChild('chart') chart?: ChartComponent;
  // public chartOptions?: Partial<ChartOptions>;
  // constructor() {
  //   this.chartOptions = {
  //     series: [44, 55, 41, 17, 15],
  //     chart: {
  //       width: 380,
  //       type: 'donut',
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     fill: {
  //       type: 'gradient',
  //     },
  //     legend: {
  //       formatter: function (val, opts) {
  //         return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
  //       },
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: 'bottom',
  //           },
  //         },
  //       },
  //     ],
  //   };
  // }

  // @Input() value: any;

  ngOnInit(): void {}
}
