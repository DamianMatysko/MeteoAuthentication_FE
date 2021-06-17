import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Metheo} from 'src/entities/metheo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  metheoDataSource = new MatTableDataSource<Metheo>();
  columns = ['id', 'date', 'temp', 'tempMin', 'tempMax', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  metheoArr: Array<Metheo> = [];

  constructor() {

  }

  ngAfterViewInit(): void {
    this.metheoDataSource.paginator = this.paginator;
    this.metheoDataSource.sort = this.sort;


    this.metheoArr.push(new Metheo('2021-3-9', 10, 5, 16, 1));
    this.metheoDataSource.data = this.metheoArr;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.metheoDataSource.filter = filterValue.trim().toLowerCase();
  }
}
