import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiserviceService } from '../apiservice.service';

Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  chartData: any = {};
  chartData1: any = {};

  constructor(private _apiService: ApiserviceService) {}

  ngOnInit() {
    this.fetchDataAndRenderChart();
    this.fetchDataAndRenderChart1();
  }

  fetchDataAndRenderChart() {
    this._apiService.getUang().then((response) => {
      if (response.msg === 'ok') {
        this.chartData = response.data;
        this.renderChart();
      } else {
        console.error('Failed to fetch data:', response.msg);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  fetchDataAndRenderChart1() {
    this._apiService.getIuran().then((response) => {
      if (response.msg === 'ok') {
        this.chartData1 = response.data;  // Ubah chartData1
        this.renderChart1();
      } else {
        console.error('Failed to fetch data:', response.msg);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  renderChart() {
    if (this.chartData.length > 0) {
      const labels: string[] = this.chartData.map((item: { keterangan: string }) => item.keterangan);
      const dataValues: number[] = this.chartData.map((item: { kd_pengeluaran: number }) => item.kd_pengeluaran);

      new Chart('piechart1', {  // Ubah ID ke 'piechart1'
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Frequency',
              data: dataValues,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.warn('No data available for piechart1.');
    }
  }

  renderChart1() {
    if (this.chartData1.length > 0) {
      const labels: string[] = this.chartData1.map((item: { jenis_pembayaran: string }) => item.jenis_pembayaran);
      const dataValues: number[] = this.chartData1.map((item: { kd_iuran: number }) => item.kd_iuran);

      new Chart('piechart2', {  // Ubah ID ke 'piechart2'
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Frequency',
              data: dataValues,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.warn('No data available for piechart2.');
    }
  }
}
