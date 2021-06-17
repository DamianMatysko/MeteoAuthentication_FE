import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Jwt} from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  readonly APIUrl = 'http://localhost:4200/api';
  public currentUser: Observable<User>;

  constructor(private httpService: HttpClient) {
  }

  authenticate(mail: string, pass: string): Observable<Jwt> {
    return this.httpService.post<Jwt>(this.APIUrl + '/authentication/authenticate', {
      username: mail,
      password: pass
    });
  }


}
