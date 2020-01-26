import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameState } from './GameStateEnum';
import { PosutilService } from './posutil.service';

@Injectable({
  providedIn: 'root'
})
export class GamestateService {
  private currentState: GameState;
  private currentLocation: any;
  private currentMapMarker: any;

  callbacks: Array<(value: any) => void>;

  constructor(private posUtilService: PosutilService) {
    this.callbacks = new Array<(value: any) => void>();
  }

  // registerOnStateChange(callback: (resolve: (value: any) => void) => void) {
  registerOnStateChange(callback: (value: any) => void) {
    // callback(res => res);
    this.callbacks.push(callback);
  }

  stateNewRound(newLocation) {
    this.currentState = GameState.NEW_ROUND;
    this.currentLocation = newLocation;

    this.callbacks.forEach(cb => {
      cb({ state: this.currentState, location: this.currentLocation });
    });
  }

  stateSubmit() {
    // this.currentState = 'SHOW_RESULT';
    this.currentState = GameState.SHOW_RESULT;

    this.callbacks.forEach(cb => {
      cb({ state: this.currentState });
    });
  }

  stateNext() {
    this.currentState = GameState.NEXT_ROUND;
    console.log('NEXT ROUND');
    this.callbacks.forEach(cb => {
      cb({ state: this.currentState });
    });
  }

  getCurrentLocation() {
    return this.currentLocation;
  }

  getCurrentState() {
    return this.currentState;
  }

  setCurrentMapMarker(newMapMarker) {
    this.currentMapMarker = newMapMarker;
    console.log('set map marker to', newMapMarker);
  }

  getResultDistance() {
    console.log('curr loc:', this.currentLocation);
    console.log('mark loc:', this.currentMapMarker);

    return this.posUtilService.calculateDistance(
      this.currentLocation.latLng,
      this.currentMapMarker
    );
  }
}
