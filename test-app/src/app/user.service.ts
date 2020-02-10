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
    // this.httpClient
    //   .post(this.loginUrl, { email: uemail, pass: upass })
    //   .toPromise()
    //   .then(res => {
    //     console.log(res);

    //     if (res == 'found') {
    //       console.log('YEAH');
    //       localStorage.setItem('loggedIn', 'true');

    //       // this.getprofiledata(uemail);
    //     }
    //   })
    //   .catch(err => console.log(err));

    // with method: POST, uemail and upass gets put in the requests body, even tho it might
    // look like params here
    fetch(`http://localhost:3000/login/${uemail}/${upass}`, { method: 'POST' })
      .then(resp => {
        console.log('response: ', resp);
        if (resp.status !== 200) {
          throw new Error('wrong credentials at login');
        } else {
          return resp.text();
        }
      })
      .then(token => {
        console.log('logged in, jwt: ', token);
        localStorage.setItem('loggedInToken', token);
      })
      .catch(err => console.log('login fetch error: ', err));
  }

  public getToken() {
    return localStorage.getItem('loggedInToken') || '';
  }

  public getTokenData() {
    let token = localStorage.getItem('loggedInToken') || '';
    let dataSlice = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'));
    let decodedDataSlice = atob(dataSlice);

    if (!decodedDataSlice) {
      return null;
    }

    try {
      return JSON.parse(decodedDataSlice);
    } catch (ex) {
      return null;
    }
  }

  public getTokenExpired() {
    let token = this.getTokenData();
    if (token) {
      let tokenExp = token.exp * 1000;
      return tokenExp > Date.now();
    }
  }

  public register(uname, uemail, upass) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.registerUrl, { user: uname, email: uemail, pass: upass })
        .toPromise()
        .then((res: any) => {
          console.log(res);
          if (res.status != 200) {
            // display error message
            reject(res.error);
            return;
          }
          if (res.status == 200) {
            console.log('YEAH');
            // display success message
            resolve(res.status);
            return;
            // setTimeout(() => {
            //   this.router.navigate(['/login']);
            // }, 600);
          }
        })
        .catch(err => {
          if (err.status && err.status == 200) {
            resolve(200);
          }
          reject(err);
        });
    });
  }

  public logout() {
    localStorage.setItem('loggedInToken', '');
    this.router.navigate(['/home']);
    window.location.reload();

    // setTimeout(() => {
    //   // localStorage.setItem('loggedInToken', '');
    //   this.router.navigate(['/home']);
    //   // window.location.reload();
    // }, 200);
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
