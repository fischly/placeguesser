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
    return (
      Math.floor(this.gameStateService.getResultDistance() / 1000).toLocaleString() + ' kilometer!'
    );
  }

  onClickSaveFav() {
    let currId = this.gameStateService.gutCurrentLocationId();
    console.log('saving id to favs: ', currId);

    fetch('http://localhost:3000/addFavorite/' + currId, {
      method: 'POST',
      headers: { Authorization: localStorage.loggedInToken }
    })
      .then(data => data.json())
      .then(json => {
        console.log(json);
        if (json.error) {
          alert('error adding favorite: ' + json.error);
        } else {
          alert('successfully added to favorites (' + json.message + ')');
        }
      });
  }
}
