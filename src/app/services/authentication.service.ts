import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {User} from '../models/user';
import {Jwt} from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly APIUrl = 'http://localhost:4200/api/authentication';
  public currentUser: Observable<User>;

  constructor(private httpService: HttpClient) {
  }

  authenticate(mail: string, pass: string): Observable<Jwt> {
    return this.httpService.post<Jwt>(this.APIUrl + '/authenticate', {
      username: mail,
      password: pass
    });
  }

  authenticateStation(id: number): Observable<Jwt> {
    return this.httpService.get<Jwt>(this.APIUrl + `/authenticate-station/${id}`);
  }


}
