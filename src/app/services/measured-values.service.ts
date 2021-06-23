import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Jwt} from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class MeasuredValuesService {
  readonly APIUrl = 'http://localhost:4200/api/measured_values';
  public currentUser: Observable<User>;

  constructor(private httpService: HttpClient) {
  }

  getAllMeasuredValues(): Observable<any> {
    return this.httpService.get<any>(this.APIUrl + '/all');
  }
}
