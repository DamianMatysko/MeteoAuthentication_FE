import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtHelper} from '../../helpers/jwt-helper';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router,
              private token: TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const token = localStorage.getItem(JWT_KEY);
    const token = this.token.getRefreshToken();
    if (token === null) {
      this.router.navigate(['login']);
      return false;
    }
    const {exp} = JwtHelper.parse(token);
    if (new Date(exp * 1000) > new Date()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
