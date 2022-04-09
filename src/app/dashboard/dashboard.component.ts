import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeasuredValues} from 'src/app/models/measuredValues';
import {MeasuredValuesService} from '../services/measured-values.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StationsService} from '../services/stations.service';
import Chart, {ChartConfiguration} from 'chart.js/auto';

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
  columns = ['id', 'measurement_time', 'humidity', 'temperature', 'air_quality', 'wind_speed', 'wind_gusts', 'wind_direction', 'rainfall'];
  canvas: any;
  ctx: any;
  myChart: any;
  @ViewChild('mychart') mychart;
  listData: MatTableDataSource<MeasuredValues>;
  stations: Array<Stations> = [];
  selectedOption = '0';

  constructor(private measuredValuesService: MeasuredValuesService,
              private stationsService: StationsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
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
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxis: {
            type: 'time',
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
        let temp: Stations = {value: i.toString(), viewValue: value[i].title, id: value[i].id};
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
        this.listData = new MatTableDataSource(values);
        this.listData.sort = this.sort;
        const dataForGraf = values.map((res) => {
          return {
            x: new Date(res.measurement_time),
            y: res.temperature,
          };
        });
        this.myChart.data.datasets[0].data = [];
        this.myChart.data.datasets[0].data.push(...dataForGraf);
        this.myChart.update();
      });
  }

}
