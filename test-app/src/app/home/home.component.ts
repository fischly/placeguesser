import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamestateService } from '../gamestate.service';
import { GameState } from '../GameStateEnum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private gameStateService: GamestateService) {}

  // protected showSubmit;

  ngOnInit() {
    // this.route.params.forEach(p => {
    //   console.log('param: ', p.get('id'));
    // });
    // this.showSubmit = this.gameStateService.getCurrentState() === GameState.SHOW_RESULT;

    this.route.paramMap.forEach(pm => {
      let id = pm.get('id');
      if (id) {
        // TODO: make call to fetch streetview to specific id
      }
    });
  }

  showSubmit() {
    return this.gameStateService.getCurrentState() === GameState.SHOW_RESULT;
  }
}
