import {Component, OnInit, ViewChild} from '@angular/core';
import {MeasuredValuesService} from '../services/measured-values.service';
import {MatTableDataSource} from '@angular/material/table';
import {MeasuredValues} from '../models/measuredValues';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent implements OnInit {
  columns = ['id', 'measurement_time', 'humidity', 'temperature', 'air_quality', 'wind_speed', 'wind_gusts', 'wind_direction', 'rainfall'];
  listData: MatTableDataSource<MeasuredValues>;
  stationID: number;

  @ViewChild(MatSort) sort: MatSort;

  metheoArr: Array<MeasuredValues> = [];


  constructor(private measuredValuesService: MeasuredValuesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.stationID = this.activatedRoute.snapshot.params.id;
    this.refreshList();
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
