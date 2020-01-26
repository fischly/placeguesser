import { Component, OnInit } from '@angular/core';
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
    this.gameStateService.registerOnStateChange(this.onGameStateChanged.bind(this)); // bind callback, so this will referr to this component
  }

  ngOnInit() {
    // let centerPlace = new google.maps.LatLng(46.646, 14.081);

    this.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
      // position: data.location.latLng,
      pov: { heading: 165, pitch: 0 },
      zoom: 1,
      addressControl: false,
      disableDefaultUI: false
      // showRoadLabels: false,
    });

    if (
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
      this.gameStateService.stateNewRound(data.location);
      // this.panorama.setPosition(data.location.latLng);
    });
    // this.panorama.setPosition(data.location.latLng);
  }

  nextLocationCity() {
    this.posUtilService.fetchCityPosition();
  }
}
