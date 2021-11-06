import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StationsService} from '../services/stations.service';
import {catchError, first} from 'rxjs/operators';
import {Router} from '@angular/router';

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
              private router: Router) {
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
        console.warn('wrong credentials');
        throw err;
      })
    ).subscribe(value => {
      this.router.navigate(['stations']);
    });
  }

}
