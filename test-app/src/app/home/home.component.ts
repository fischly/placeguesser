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
  givenParamId = -1;

  constructor(private route: ActivatedRoute, private gameStateService: GamestateService) {}

  // protected showSubmit;

  ngOnInit() {
    // this.route.params.forEach(p => {
    //   console.log('param: ', p.get('id'));
    // });
    // this.showSubmit = this.gameStateService.getCurrentState() === GameState.SHOW_RESULT;
    // for (const idIterator in this.route.params) {
    //   console.log('id iterator: ', idIterator, this.route.params[idIterator]);
    // }
    let idValue = this.route.params['_value'].id;
    if (idValue && !isNaN(idValue)) {
      this.givenParamId = idValue;
      this.gameStateService.stateById(this.givenParamId);
      console.log('setting givenParamId: ', this.givenParamId);
    }
    // this.route.paramMap.forEach(pm => {
    //   let id = pm.get('id');
    //   if (id) {
    //     // TODO: make call to fetch streetview to specific id
    //     // this.gameStateService.stateNewRound();
    //     // this.gameStateService.stateById(id);
    //     this.givenParamId = +id;
    //     console.log('setting givenParamId: ', this.givenParamId);
    //   }
    // });
  }

  showSubmit() {
    return this.gameStateService.getCurrentState() === GameState.SHOW_RESULT;
  }
}
