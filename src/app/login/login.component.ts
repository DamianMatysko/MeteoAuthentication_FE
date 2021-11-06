import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {JWT_KEY} from '../config/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, first} from 'rxjs/operators';
import {AppConstants} from '../config/OAuth2/app.constants';
import {TokenStorageService} from '../services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;

  hide = true;
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    pass: new FormControl(null, [Validators.required]),
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParamMap.get('token');
    const error: string = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    } else if (token) {
      this.tokenStorage.saveToken(token);
      this.authenticationService.getCurrentUser().subscribe(
        data => {
          this.loginAuth(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  loginAuth(user): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    window.location.reload();
   // this.router.navigate(['dashboard']);
  }

  login(): any {
    const {email, pass} = this.form.getRawValue() as { email: string, pass: string };
    // console.log(email + ' ' + pass);
    this.authenticationService.authenticate(email, pass).pipe(
      first(),
      catchError(err => {
        console.warn('wrong credentials');
        throw err;
      })
    ).subscribe(token => {
      localStorage.setItem(JWT_KEY, token.jwt);
      this.router.navigate(['dashboard']);
    });
  }



}
