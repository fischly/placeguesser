import { Component, OnInit } from '@angular/core';
import { GamestateService } from '../gamestate.service';
import { GameState } from '../GameStateEnum';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {
  constructor(private gameStateService: GamestateService) {}

  ngOnInit() {}

  onClickNext() {
    this.gameStateService.stateNext();
    // this.currentDistanceText =
    //   Math.floor(this.gameStateService.getResultDistance()).toLocaleString() + ' meter!';
  }

  getDistance() {
    return Math.floor(this.gameStateService.getResultDistance()).toLocaleString() + ' meter!';
  }
}
