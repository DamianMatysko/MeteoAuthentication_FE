import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   let authReq = request;
  //   const loginPath = '/login';
  //   const token = this.token.getToken();
  //   if (token != null) {
  //     // authReq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
  //     authReq = request.clone({setHeaders: {Authorization: 'Bearer ' + token}});
  //   }
  //   return next.handle(authReq).pipe(tap(() => {
  //     },
  //     (err: any) => {
  //       if (err instanceof HttpErrorResponse) {
  //         if (err.status !== 401 || window.location.pathname === loginPath) {
  //           return;
  //         }
  //         this.token.signOut();
  //         window.location.href = loginPath;
  //       }
  //     }
  //   ));
 // }

      const token = this.token.getToken();
      console.log(token);
      if (token === null) {
        return next.handle(request);
      }
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

      return next.handle(request);
    }


}
export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}
];


// // todo  const token = localStorage.getItem(JWT_KEY);
//   const token = sessionStorage.getItem('auth-token');
//   console.log(token);
//   if (token === null) {
//     return next.handle(request);
//   }
//   request = request.clone({
//     setHeaders: {
//       Authorization: 'Bearer ' + token
//     }
//   });
//
//   return next.handle(request);
// }

