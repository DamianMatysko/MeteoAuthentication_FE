import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeasuredValues} from '../models/measuredValues';
import {MeasuredValuesService} from '../services/measured-values.service';
import {StationsService} from '../services/stations.service';
import {ChartConfiguration} from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

interface Stations {
  value: string;
  viewValue: string;
  id: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('toto', {static: true}) mySelect: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  columns = ['measurement_time', 'humidity', 'temperature', 'air_quality', 'wind_speed', 'wind_gusts', 'wind_direction', 'rainfall'];
  canvas: any;
  ctx: any;
  myChart: any;
  @ViewChild('mychart') mychart;
  listData: MatTableDataSource<MeasuredValues>;
  stations: Array<Stations> = [];
  selectedOption = '0';

  constructor(private measuredValuesService: MeasuredValuesService,
              private stationsService: StationsService) {
  }

  async ngAfterViewInit(): Promise<void> {
    this.setSelectBox();
    this.setupGraf();
  }

  onChangeCategory(event): void {
    this.getMeasuretValues(this.stations[event.value].id);
  }

  setupGraf(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(255, 99, 132,0.4)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
          },
          {
            label: 'Humidity',
            backgroundColor: 'rgba(99,107,255,0.4)',
            borderColor: 'rgb(99,143,255)',
            data: [],
          },
          {
            label: 'Air quality',
            backgroundColor: 'rgba(12,105,3,0.4)',
            borderColor: 'rgb(161,255,99)',
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxis: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'HH:mm',
              },
            },
            position: 'bottom',
          },
        },
      },
    };
    this.myChart = new Chart(this.ctx, config);
  }

  private setSelectBox(): void {
    this.stationsService.getUserStations().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        const temp: Stations = {value: i.toString(), viewValue: value[i].title, id: value[i].id};
        this.stations.push(temp);
      }
      this.getMeasuretValues(this.stations[0].id);
    });
  }

  private refreshList(id: number): void {
    this.measuredValuesService.getByStation(id).subscribe(value => {
      this.listData = new MatTableDataSource(value);
      this.listData.sort = this.sort;
    });
  }

  applyFilter(filtervalue: KeyboardEvent): void {
    this.listData.filter = (filtervalue.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  getMeasuretValues(id: number): void {
    this.measuredValuesService.getByStation(id)
      .subscribe((values) => {
        console.log(values);
        this.listData = new MatTableDataSource(values);
        this.listData.sort = this.sort;
        const temperature = values.map((res) => {
          return {
            x: new Date(res.measurement_time),
            y: res.temperature,
          };
        });
        const humidity = values.map((res) => {
          return {
            x: new Date(res.measurement_time),
            y: res.humidity,
          };
        });
        const airQuality = values.map((res) => {
          return {
            x: new Date(res.measurement_time),
            y: res.air_quality,
          };
        });
        this.myChart.data.datasets[0].data = [];
        this.myChart.data.datasets[1].data = [];
        this.myChart.data.datasets[2].data = [];
        this.myChart.data.datasets[0].data.push(...temperature);
        this.myChart.data.datasets[1].data.push(...humidity);
        this.myChart.data.datasets[2].data.push(...airQuality);
        this.myChart.update();
      });
  }

}
