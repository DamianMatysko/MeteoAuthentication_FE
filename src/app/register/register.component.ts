import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {catchError, first} from 'rxjs/operators';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {JWT_KEY} from '../config/constants';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  public regForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null),
    email: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required])
  }, {
    validators: this.checkPasswords
  });

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }
  check(): boolean {
    return this.regForm.hasError('notSame');
  }


  checkPasswords(group: AbstractControl): ValidationErrors | null {
    console.log(group);
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }

  register(): any {
    console.log(this.regForm, this.regForm.hasError('notSame'));
    if (this.regForm.invalid) {
      return false;
    }
    const user: { username: string; password: string; email: string; city: string } = this.regForm.getRawValue() as {
      username: string, password: string, email: string, city: string
    };
    this.authenticationService.registerUser(user).pipe(
      first(),
      catchError(err => {
        console.warn('wrong credentials');
        throw err;
      })
    ).subscribe(value => {
      this.router.navigate(['login']);
    });
  }

}
