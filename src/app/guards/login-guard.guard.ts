import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {JWT_KEY} from '../config/constants';
import {JwtHelper} from '../../helpers/jwt-helper';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem(JWT_KEY);
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
