import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {catchError, first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';



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
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
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
        this.snackBar.open('Error: ' + err.status + ' wrong credentials', 'cancel',
          {duration: 2000, panelClass: ['blue-snackbar']});
        throw err;
      })
    ).subscribe(value => {
      this.router.navigate(['login']);
      this.snackBar.open('Success' , 'ok',
        {duration: 2000, panelClass: ['blue-snackbar']});
    });
  }

}
