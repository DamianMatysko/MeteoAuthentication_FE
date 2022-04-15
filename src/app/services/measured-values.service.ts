import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {MeasuredValues} from '../models/measuredValues';

@Injectable({
  providedIn: 'root'
})
export class MeasuredValuesService {
  // readonly APIUrl = 'http://localhost:9090/api/measured_values';
  readonly APIUrl = 'https://meteoauth.tk/api/measured_values';
  public currentUser: Observable<User>;

  constructor(private httpService: HttpClient) {
  }

  getByStation(id: number): Observable<any> {
    return this.httpService.get<any>(this.APIUrl + '/by-station/' + id);
  }
}
