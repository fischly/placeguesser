import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  protected message;

  user = new FormGroup({
    newuser: new FormControl(),
  });

  constructor(private userservice:UserService, private dialogref: MatDialogRef<DialogUserComponent>) { }

  ngOnInit() {
    this.message="";
  }

  sendData(){
    let newpass = this.user.getRawValue().newuser;


    if(newpass==null){
      return;
    }

    this.userservice.updateuser(localStorage.getItem('email'),newpass);

    setTimeout(()=>{

      window.alert("Username changed");
    
      this.dialogref.close();

      window.location.reload();
      


    },600);
  }

}
