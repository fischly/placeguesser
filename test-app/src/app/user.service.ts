import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //eventuell ändern:
  private loginUrl = 'http://localhost:3000/login';
  private registerUrl = 'http://localhost:3000/register';
  private getUrl = 'http://localhost:3000/profile';
  private delUrl = 'http://localhost:3000/delete';
  private putUrl = 'http://localhost:3000/editpass';
  private putuUrl = 'http://localhost:3000/edituser';

  private loggedin = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  private username;
  private useremail;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public login(uemail, upass) {
    this.httpClient
      .post(this.loginUrl, { email: uemail, pass: upass })
      .toPromise()
      .then(res => {
        console.log(res);

        if (res == 'found') {
          console.log('YEAH');
          localStorage.setItem('loggedIn', 'true');

          this.getprofiledata(uemail);
        }
      })
      .catch(err => console.log(err));
  }

  public register(uname, uemail, upass) {
    this.httpClient
      .post(this.registerUrl, { user: uname, email: uemail, pass: upass })
      .toPromise()
      .then(res => {
        console.log(res);
        if (res == 'aexists') localStorage.setItem('emailexists', 'true');
        else if (res == 'registered') {
          console.log('YEAH');
          localStorage.setItem('emailexists', 'true');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      })
      .catch(err => console.log(err));
  }

  public logout() {
    setTimeout(() => {
      this.username = null;
      this.useremail = null;
      localStorage.setItem('loggedIn', 'false');
      localStorage.clear();
      window.location.reload();
    }, 1000);
  }

  getStatus() {
    return JSON.parse(localStorage.getItem('loggedIn'));
  }

  public getprofiledata(uemail) {
    this.httpClient
      .get(this.getUrl + '?email=' + uemail)
      .toPromise()
      .then(res => {
        console.log('setting profile data');

        localStorage.setItem('email', res['email']);
        localStorage.setItem('user', res['username']);

        setTimeout(() => {
          location.reload();

          this.router.navigate(['/profile']);
        }, 500);
      })
      .catch(err => console.log(err));
  }

  public updatepass(uemail, oldp, newp) {
    this.httpClient
      .put(this.putUrl, { email: uemail, oldpass: oldp, newpass: newp })
      .subscribe(res => {
        console.log(res);

        setTimeout(() => {
          if (res == 'notfound') localStorage.setItem('wrongpass', 'true');
          else if (res == 'updated') {
            console.log('updated');

            //this.getprofiledata(uemail);

            localStorage.setItem('wrongpass', 'false');

            //window.location.reload();
          }
        }, 20);
      });
  }

  public updateuser(uemail, newu) {
    this.httpClient
      .put(this.putuUrl, { email: uemail, newuser: newu })
      .toPromise()
      .then(res => {
        console.log(res);

        if (res == 'notfound') localStorage.setItem('wrongpass', 'true');
        else if (res == 'updated') {
          console.log('updated');

          this.getprofiledata(uemail);

          //window.location.reload();
        }
      })
      .catch(err => console.log(err));
  }

  deleteuser(uemail) {
    this.httpClient.delete(this.delUrl + '?email=' + uemail).subscribe(res => {
      setTimeout(() => {
        if (res == 'deleted') {
          console.log('deleted');
          window.alert('Accound deleted');
          this.logout();
        }
      }, 600);
    });
  }

  /*

    in the making: other functions like logout, delete, update..

  }*/
}
