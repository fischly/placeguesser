import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public Msg="";

  userform = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    pass: new FormControl(),
    passc: new FormControl()
  });

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  onFormSubmit(): void {
    this.Msg="";

    let user = this.userform.getRawValue().username;
    let email = this.userform.getRawValue().email;
    let pass = this.userform.getRawValue().pass;
    let passc = this.userform.getRawValue().passc;

    if(user==null||email==null || pass==null || passc==null){
      this.Msg="Missing username, Email or Password";
      return;
    }
    if(pass!=passc){
      this.Msg="Passwords not matching";
      return;
    }
    if(pass.length<8){
      this.Msg="Password must be at least 8 characters long";
      return;
    }
    if(localStorage.getItem('emailexists')=='true'){
      this.Msg="Email already used, try a new one";
      localStorage.setItem('emailexists','false');
      return;

    }

    

    this.userService.register(user,email,pass);

    this.userform.reset();
}

public output(text){
  this.Msg=text;
}

}
