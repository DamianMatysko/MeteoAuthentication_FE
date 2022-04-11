import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Station} from '../models/station';
import {MatSort} from '@angular/material/sort';
import {StationsService} from '../services/stations.service';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {first} from 'rxjs/operators';
import {ShowTokenComponent} from '../show-token/show-token.component';

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
              private authenticationServiceService: AuthenticationService,
              private dialog: MatDialog) {

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
      this.token = value.jwt;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      this.dialog.open(ShowTokenComponent, {
        data: {token: this.token}
      });
    });
  }

}
