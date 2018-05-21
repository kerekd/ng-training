import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public loading = true;
  public user: User = new User;
  public form = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z ,.'-]+$/i)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    RegistrationComponent.passwordMatchValidator
  );

  public static passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : { 'mismatch': true };
  }

  public constructor(private _userService: UserService) {
    //
  }

  public ngOnInit() {
    this.loading = false;
  }

  public register() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this._userService.register(this.user).subscribe(
      (response: Response) => {
        console.log(response);
        window.alert('Successful registration!');

        this.user = new User();
        this.form.reset();
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        window.alert('Registration failed.');
        this.loading = false;
      },
      () => {
        //
      }
    );
  }

}
