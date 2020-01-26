import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform = new FormGroup({
    email: new FormControl(),
    pass: new FormControl()
  });

  public Msg;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  onFormSubmit(): void {
    this.Msg = '';

    let email = this.userform.getRawValue().email;
    let pass = this.userform.getRawValue().pass;

    if (email == null || pass == null) {
      this.Msg = 'Missing Email or Password';
      return;
    }

    this.userService.login(email, pass);

    this.userform.reset();
  }
}
