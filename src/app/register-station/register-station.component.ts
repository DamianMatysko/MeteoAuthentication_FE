import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StationsService} from '../services/stations.service';
import {catchError, first} from 'rxjs/operators';
import {JWT_KEY} from '../config/constants';
import {Station} from '../models/station';

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

  constructor(private  stationsService: StationsService) {
  }

  ngOnInit(): void {
  }

  registerStation(): any {
    const station: { title: string; destination: string; model_description: string; phone: string } = this.stationRegForm.getRawValue() as {
      title: string, destination: string, model_description: string, phone: string
    };
    this.stationsService.addUserStations(station).pipe(
      first(),
      catchError(err => {
        console.warn('wrong credentials');
        throw err;
      })
    ).subscribe();
  }

}
