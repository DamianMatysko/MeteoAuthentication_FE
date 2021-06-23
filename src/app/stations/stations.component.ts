import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {StationsService} from '../services/stations.service';
import {Station} from '../models/station';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  columns = ['id', 'title', 'destination', 'model_description', 'registration_time', 'phone', 'actions'];
  listData: MatTableDataSource<Station>;


  @ViewChild(MatSort) sort: MatSort;
  token: string | null = null;

  constructor(private stationsService: StationsService,
              private authenticationServiceService: AuthenticationService) {

  }


  private refreshList(): void {
    this.stationsService.getUserStations().subscribe(stations => {
      this.listData = new MatTableDataSource(stations);
      this.listData.sort = this.sort;
      console.log(stations);
    });
  }

  applyFilter(filtervalue: KeyboardEvent): void {
    this.listData.filter = (filtervalue.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
    this.refreshList();
  }

  getToken(id: number): void {
    this.authenticationServiceService.authenticateStation(id).pipe(first()).subscribe(value => {
      console.log(value);
      this.token = value.jwt;
    });

  }
}
