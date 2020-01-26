import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';
import { DialogDelteComponent } from '../dialog-delte/dialog-delte.component';
import { DialogPassComponent } from '../dialog-pass/dialog-pass.component';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  email;
  score;

  constructor(private userservice: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.email = localStorage.getItem('email');
    this.score = 0;
  }

  delaccount() {
    let dialogref = this.dialog.open(DialogDelteComponent);

    dialogref.afterClosed().subscribe(res => {
      console.log(res);
      if (res == 'true') this.userservice.deleteuser(localStorage.getItem('email'));
    });
  }

  changepass() {
    let dialogref = this.dialog.open(DialogPassComponent);

    dialogref.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  changeuser() {
    let dialogref = this.dialog.open(DialogUserComponent);

    dialogref.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  onLoad() {
    setTimeout(() => {
      console.log('onLOad');
      this.email = localStorage.getItem('email');
      this.user = localStorage.getItem('user');
    }, 1500);
  }

  setuser(uname) {
    this.user = uname;
  }
  setemail(uemail) {
    this.email = uemail;
  }
}
