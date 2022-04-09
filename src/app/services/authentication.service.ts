import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Jwt} from '../models/jwt';
import {AppConstants} from '../config/OAuth2/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // readonly APIUrl = 'http://localhost:9090/api/authentication';
  readonly APIUrl = 'https://meteoauth.tk/api/authentication';
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

  registerUser(user: { username: string, password: string, email: string, city: string }): Observable<Jwt> {
    return this.httpService.post<Jwt>(this.APIUrl + '/register', {
      username: user.username,
      password: user.password,
      email: user.email,
      city: user.city
    });
  }

  getCurrentUser(): Observable<any> {
    return this.httpService.get(this.APIUrl + '/user/me', httpOptions);
  }
}
