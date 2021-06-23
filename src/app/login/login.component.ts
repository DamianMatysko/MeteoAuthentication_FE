import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {JWT_KEY} from '../config/constants';
import {Router} from '@angular/router';
import {catchError, first} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    pass: new FormControl(null, [Validators.required]),
  });

  constructor(private authenticationServiceService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): any {
    const {email, pass} = this.form.getRawValue() as { email: string, pass: string };
    console.log(email + ' ' + pass);
    this.authenticationServiceService.authenticate(email, pass).pipe(
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
