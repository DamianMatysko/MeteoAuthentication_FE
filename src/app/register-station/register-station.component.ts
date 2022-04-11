import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StationsService} from '../services/stations.service';
import {catchError, first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-station',
  templateUrl: './register-station.component.html',
  styleUrls: ['./register-station.component.css']
})
export class RegisterStationComponent implements OnInit {
  hide = true;
  public stationRegForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    destination: new FormControl(null, [Validators.required]),
    model_description: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required])
  });

  constructor(private stationsService: StationsService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  registerStation(): any {
    if (this.stationRegForm.invalid) {
      return false;
    }
    const station: { title: string; destination: string; model_description: string; phone: string } = this.stationRegForm.getRawValue() as {
      title: string, destination: string, model_description: string, phone: string
    };
    this.stationsService.addUserStations(station).pipe(
      first(),
      catchError(err => {
        this.snackBar.open('Error: ' + err.status + ' wrong credentials', 'cancel',
          {duration: 2000, panelClass: ['blue-snackbar']});
        throw err;
      })
    ).subscribe(value => {
      this.router.navigate(['stations']);
      this.snackBar.open('Success' , 'ok',
        {duration: 2000, panelClass: ['blue-snackbar']});
    });
  }

}
