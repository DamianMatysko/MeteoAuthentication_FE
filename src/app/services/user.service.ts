import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // readonly APIUrl = 'http://localhost:9090/api/users';
  readonly APIUrl = 'https://meteoauth.tk/api/users';

  constructor(private httpService: HttpClient) {
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
