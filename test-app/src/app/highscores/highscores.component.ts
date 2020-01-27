import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {
  favorites;
  errorMsg;

  constructor() {}

  ngOnInit() {
    fetch('http://localhost:3000/getFavorites', {
      method: 'POST',
      headers: { Authorization: localStorage.loggedInToken }
    })
      .then(data => data.json())
      .then(json => {
        if (json.error) {
          this.errorMsg = json.error;
        }
        console.log(json);
        this.favorites = json.favs.map(f => {
          return { link: '/home/' + f.loc_id };
        });
      });
  }
}
