import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeasuredValues} from 'src/app/models/measuredValues';
import {MeasuredValuesService} from '../services/measured-values.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  columns = ['id', 'measurement_time', 'humidity', 'temperature', 'air_quality', 'wind_speed', 'wind_gusts', 'wind_direction', 'rainfall'];
  listData: MatTableDataSource<MeasuredValues>;


  @ViewChild(MatSort) sort: MatSort;

  metheoArr: Array<MeasuredValues> = [];

  constructor(private measuredValuesService: MeasuredValuesService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {

  }


  ngAfterViewInit(): void {
    this.refreshList();
  }


  private refreshList() {
    this.measuredValuesService.getAllMeasuredValues().subscribe(value => {
      this.listData = new MatTableDataSource(value);
      this.listData.sort = this.sort;
      console.log(value);
    });
  }

  applyFilter(filtervalue: KeyboardEvent): void {
    this.listData.filter = (filtervalue.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }


}


