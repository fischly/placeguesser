import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatGridTileHeaderCssMatStyler, MatDialogRef } from '@angular/material';
import { UserService } from "../user.service";

@Component({
  selector: 'app-dialog-pass',
  templateUrl: './dialog-pass.component.html',
  styleUrls: ['./dialog-pass.component.css']
})
export class DialogPassComponent implements OnInit {

  protected message;

  passwords = new FormGroup({
    oldpass: new FormControl(),
    pass: new FormControl(),
    passc: new FormControl()
  });

  constructor(private userservice:UserService, private dialogref: MatDialogRef<DialogPassComponent>){ }

  ngOnInit() {
    this.message="";
  }

  sendData(){

    let oldpass = this.passwords.getRawValue().oldpass;
    let pass = this.passwords.getRawValue().pass;
    let passc = this.passwords.getRawValue().passc;

    localStorage.setItem('wrongpass', 'false');

    if(oldpass==null||pass==null||passc==null){
      this.message="Please fill all required fields";
      return;

    }
    if(oldpass==pass){
      this.message="New password must be different";
      return;
    }
    if(pass.length<8){
      this.message="Password min. size: 8 characters";
      return;
    }
    if(pass!=passc){
      this.message="Passwords not matching";
      return;
    }
      



    console.log(oldpass);
    this.userservice.updatepass(localStorage.getItem('email'),oldpass,pass);

    setTimeout(()=>{

      console.log(localStorage.getItem('wrongpass'));
      
      if(localStorage.getItem('wrongpass')=='true'){
        this.message="incorrect password";
        return;
      }
      else{

      window.alert("Password changed");
    
      this.dialogref.close();

      window.location.reload();
    }


    },600);

    

    


  }

}
