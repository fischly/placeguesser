import { Component, OnInit, Input } from '@angular/core';
import { PosutilService } from '../posutil.service';
import { GamestateService } from '../gamestate.service';
import { state } from '@angular/animations';
import { google } from 'google-maps'; // importing, so the compiler wont cry not finding the typings...
import { GameState } from '../GameStateEnum';

// import * from 'googlemaps';
// import {} from 'googlemaps';

@Component({
  selector: 'app-pano-view',
  templateUrl: './pano-view.component.html',
  styleUrls: ['./pano-view.component.css']
})
export class PanoViewComponent implements OnInit {
  panorama: google.maps.StreetViewPanorama;

  constructor(private posUtilService: PosutilService, private gameStateService: GamestateService) {
    console.log('PANO ON CTOR, givenId: ', this.gameStateService.getCurrentState());
    // this.gameStateService.registerOnStateChange(this.onGameStateChanged.bind(this)); // bind callback, so this will referr to this component
  }

  ngOnInit() {
    // let centerPlace = new google.maps.LatLng(46.646, 14.081);
    console.log('PANO ON INIT, givenId: ', this.gameStateService.getCurrentState());

    this.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
      // position: data.location.latLng,
      pov: { heading: 165, pitch: 0 },
      zoom: 1,
      addressControl: false,
      disableDefaultUI: false
      // showRoadLabels: false,
    });

    // console.log('CURRENT STATE @ PANO INIT:', this.gameStateService.getCurrentState());

    if (this.gameStateService.getCurrentState() === GameState.LOCATION_ID) {
      console.log('not fetching random img, id:', this.gameStateService.gutCurrentLocationId());
      this.nextLocationById(this.gameStateService.gutCurrentLocationId());
    } else if (
      this.gameStateService.getCurrentState() === GameState.NEW_ROUND &&
      this.gameStateService.getCurrentLocation() != null
    ) {
      this.panorama.setPosition(this.gameStateService.getCurrentLocation().latLng);
    } else {
      this.nextLocationRandom();
    }

    /*this.posUtilService.getViewFromLatLng(centerPlace).then(data => {
      console.log('GOT THEN: ', data);
      console.log('GOT THEN: ', data.location.latLng.lat());
      // this.panorama.setPosition(new google.maps.LatLng(data.location.latLng));
      // this.panorama.setPosition(data.location.latLng);
      this.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
        // position: data.location.latLng,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
        addressControl: false,
        disableDefaultUI: false
        // showRoadLabels: false,
      });
    });
    console.log(this.panorama);
    this.posUtilService.fetchCityPosition().then(data => {
      console.log('FINAL DATA: ', data);
    });*/

    // var centerPlace = new google.maps.LatLng(0.0, 0.0);
    // this.posUtilService.getViewFromLatLng(centerPlace);
    // // new google.maps.StreetViewService();
    // let centerPlace = new google.maps.LatLng(46.646, 14.081);
    // console.log('centerplace: ', centerPlace);

    this.gameStateService.registerOnStateChange(this.onGameStateChanged.bind(this), 'PANO'); // bind callback, so this will referr to this component
  }

  onGameStateChanged(stateData) {
    console.log('ON GAME STATE CHANGED @ PANO: ', stateData);
    if (stateData.state === GameState.NEW_ROUND) {
      this.panorama.setPosition(stateData.location.latLng);
    }

    if (stateData.state === GameState.NEXT_ROUND) {
      this.nextLocationRandom();
    }
  }

  nextLocationRandom() {
    this.posUtilService.fetchCityPosition().then((data: any) => {
      console.log('GOT NEXT LOCATION DATA: ', data);
      this.gameStateService.stateNewRound(data.location, data.ownId);
      // this.panorama.setPosition(data.location.latLng);
    });
    // this.panorama.setPosition(data.location.latLng);
  }

  nextLocationById(id) {
    this.posUtilService
      .fetchCityById(id)
      .then((data: any) => {
        console.log('GOT NEXT LOCATION BY ID: ', data);
        this.gameStateService.stateNewRound(data.location, data.ownId);
      })
      .catch(err => {
        console.log('EROR FETCHING BY ID:', err);
        if (err.statusText == 'Not Found') {
          // TODO: error popup
          alert(`given id could not be found (${id})`);
        }
      });
  }

  // TODO: implement fully
  nextLocationCity() {
    this.posUtilService.fetchCityPosition();
  }
}
