import {HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Jwt} from '../models/jwt';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService,
              private authenticationService: AuthenticationService) {
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private static addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<unknown> {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.token.getToken();
    if (token != null) {
      authReq = AuthorizationInterceptor.addTokenHeader(request, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      console.log(authReq.url.toString());
      if (error instanceof HttpErrorResponse && !authReq.url.includes('/authenticate') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.token.getRefreshToken();
      if (token) {
        return this.authenticationService.refreshToken(token).pipe(
          switchMap((jwt: Jwt) => {
            this.isRefreshing = false;
            this.token.saveToken(jwt.jwt);
            this.token.saveRefreshToken(jwt.refreshToken);
            this.refreshTokenSubject.next(jwt.jwt);

            return next.handle(AuthorizationInterceptor.addTokenHeader(request, jwt.jwt));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.token.signOut();
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(AuthorizationInterceptor.addTokenHeader(request, token)))
    );
  }

}
