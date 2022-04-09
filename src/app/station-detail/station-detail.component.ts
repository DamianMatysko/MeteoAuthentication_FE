import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MeasuredValuesService} from '../services/measured-values.service';
import {MatTableDataSource} from '@angular/material/table';
import {MeasuredValues} from '../models/measuredValues';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import Chart, {ChartConfiguration} from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})

export class StationDetailComponent implements AfterViewInit {
  columns = ['id', 'measurement_time', 'humidity', 'temperature', 'air_quality', 'wind_speed', 'wind_gusts', 'wind_direction', 'rainfall'];
  listData: MatTableDataSource<MeasuredValues>;
  stationID: number;

  @ViewChild(MatSort) sort: MatSort;
  metheoArr: Array<MeasuredValues> = [];

  name = 'Angular   6';
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  // chart;
  // weatherDates;

  constructor(private measuredValuesService: MeasuredValuesService,
              private activatedRoute: ActivatedRoute) {
  }

  async ngAfterViewInit(): Promise<void> {
    this.stationID = this.activatedRoute.snapshot.params.id;
    this.refreshList();


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

    const myChart = new Chart(this.ctx, config);


    // interval(2000)
    //  .pipe(switchMap(() => this.measuredValuesService.getAllMeasuredValues()))
    this.measuredValuesService.getAllMeasuredValues()
      .subscribe((values) => {
        console.log('new data');
        const newData = values.map((res) => {
          return {
            x: new Date(res.measurement_time),
            y: res.temperature,
          };
        });


        // myChart.data.datasets.forEach((dataset) => {
        //
        //   dataset.data.push(...newData);
        // });


        // myChart.data.datasets[0].data.concat(newData);
        myChart.data.datasets[0].data.push(...newData);

        myChart.update();

        return;

      });


  }


  private refreshList(): any {
    this.measuredValuesService.getByStation(this.stationID).subscribe(value => {
      this.listData = new MatTableDataSource(value);
      this.listData.sort = this.sort;
    });
  }

  applyFilter(filtervalue: KeyboardEvent): void {
    this.listData.filter = (filtervalue.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

}
