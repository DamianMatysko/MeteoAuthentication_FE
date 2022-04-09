import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {AppConstants} from '../config/OAuth2/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // readonly APIUrl = 'http://localhost:9090/api/users';
  readonly APIUrl = 'https://meteoauth.tk/api/users';

  // readonly APIUrl = AppConstants.API_BASE_URL;

  constructor(private httpService: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.httpService.get<any>(this.APIUrl);
  }

  getUser(email: string): Observable<any> {
    return this.httpService.get<any>(this.APIUrl + '/' + email);
  }

  updateUser(user: User): Observable<any> {
    return this.httpService.post<any>(this.APIUrl + '/authentication/authenticate', {
      username: user.username,
      password: user.password,
      email: user.email,
      city: user.city
    });
  }

  deleteUser(): Observable<any> {
    return this.httpService.delete(this.APIUrl + '/delete');
  }
}
