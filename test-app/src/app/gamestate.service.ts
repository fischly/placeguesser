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
  private currentLocationId = -1;

  callbacks: Array<(value: any) => void>;

  constructor(private posUtilService: PosutilService) {
    this.callbacks = new Array<(value: any) => void>();
  }

  registerOnStateChange(callback: (value: any) => void, callee: string) {
    // callback(res => res);
    this.callbacks[callee] = callback;
    // this.callbacks.push(callback);
  }

  stateNewRound(newLocation, newLocationId = -1) {
    this.currentState = GameState.NEW_ROUND;
    this.currentLocation = newLocation;
    this.currentLocationId = newLocationId;
    console.log('NEW LOCATION ID: ', this.currentLocationId);

    this.callCallbacks();
    // this.callbacks.forEach(cb => {
    //   cb({ state: this.currentState, location: this.currentLocation });
    // });
  }

  stateSubmit() {
    this.currentState = GameState.SHOW_RESULT;
    this.callCallbacks();
  }

  stateNext() {
    this.currentState = GameState.NEXT_ROUND;
    this.callCallbacks();
  }

  callCallbacks() {
    for (let cb in this.callbacks) {
      if (this.callbacks[cb]) {
        this.callbacks[cb]({ state: this.currentState, location: this.currentLocation });
      }
    }
  }

  stateById(id) {
    this.currentState = GameState.LOCATION_ID;
    this.currentLocationId = id;
    console.log('game state by id with id: ', id);
  }

  getCurrentLocation() {
    return this.currentLocation;
  }

  getCurrentState() {
    return this.currentState;
  }

  gutCurrentLocationId() {
    return this.currentLocationId;
  }

  setCurrentMapMarker(newMapMarker) {
    this.currentMapMarker = newMapMarker;
    console.log('set map marker to', newMapMarker);
  }

  getResultDistance() {
    return this.posUtilService.calculateDistance(
      this.currentLocation.latLng,
      this.currentMapMarker
    );
  }
}
