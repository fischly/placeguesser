import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { GamestateService } from './gamestate.service';
// import { get } from 'scriptjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app';

  constructor(
    private userverice: UserService,
    private router: Router,
    private gameStateService: GamestateService
  ) {}

  protected check = this.userverice.getTokenExpired();
  protected emailLogin = this.userverice.getTokenData()
    ? this.userverice.getTokenData().email || ''
    : '';

  onclick() {
    console.log('Quak');
    this.userverice.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    // this.loadScripts();
    // get(
    //   'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlrSG311wiTvpZsf0ACAG9l00rsGFhxpU',
    //   () => {
    //     console.log('google maps had been loaded!');
    //     let centerPlace = new google.maps.LatLng(46.646, 14.081);
    //     console.log('centerplace: ', centerPlace);
    //   }
    // );
  }

  onClickSubmit() {
    // console.log('getCurrentNavigation:', this.router.getCurrentNavigation());
    // console.log('config:', this.router.config);

    // this.router.config.forEach(c => {
    //   console.log('c: ', c);
    // });

    // console.log('url:', this.router.url);
    if (this.router.url.indexOf('home') >= 0) {
      this.gameStateService.stateSubmit();
    }
  }
}
