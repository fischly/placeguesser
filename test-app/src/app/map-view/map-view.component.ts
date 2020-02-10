import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GamestateService } from '../gamestate.service';
import { google } from 'google-maps';
import { GameState } from '../GameStateEnum';

// having to declare google even tho typings are installed
// and even vs code's intellisense is working with it...
// declare const google: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  @ViewChild('gmap', { static: true }) gmapElement: any;

  map: google.maps.Map;
  panoMarker: google.maps.Marker;
  selectionMarker: google.maps.Marker;

  constructor(private gameStateService: GamestateService) {
    this.gameStateService.registerOnStateChange(this.onGameStateChanged.bind(this), 'MAP');
  }

  ngOnInit() {
    this.initMap();
  }

  onGameStateChanged(stateData) {
    console.log('ON GAME STATE CHANGED @ MAP: ', stateData);
    if (stateData.state === GameState.NEW_ROUND) {
      this.panoMarker.setVisible(false);
    }
    if (stateData.state === GameState.NEXT_ROUND) {
      // TODO: implement reset function
      this.map.setCenter(new google.maps.LatLng(50, 12));
      this.map.setZoom(4);
      this.selectionMarker.setPosition(new google.maps.LatLng(50, 12));
      this.panoMarker.setVisible(false);
    }
    if (stateData.state === GameState.SHOW_RESULT) {
      this.panoMarker.setPosition(this.gameStateService.getCurrentLocation().latLng);
      this.panoMarker.setVisible(true);

      this.map.fitBounds(
        new google.maps.LatLngBounds(
          this.panoMarker.getPosition(),
          this.selectionMarker.getPosition()
        )
      );
    }
  }

  initMap() {
    //var centerPlace = new google.maps.LatLng(46.646, 14.081);
    let centerPlace = new google.maps.LatLng(0.0, 0.0);

    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: centerPlace,
      zoom: 1,
      clickableIcons: false,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      gestureHandling: 'cooperative',
      scrollwheel: true
    });

    // google.maps.event.addListener(this.map, 'idle', () => {
    //   google.maps.event.trigger(this.map, 'resize');
    // });

    // this.gmapElement.nativeElement.width = '300px';
    // this.gmapElement.nativeElement.style.width = '300px';
    let imageG = {
      url: '../assets/icons/cross_g.png',
      size: new google.maps.Size(28, 22),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(13, 10)
    };

    this.panoMarker = new google.maps.Marker({
      position: centerPlace,
      icon: imageG,
      map: this.map,
      draggable: false
    });
    this.panoMarker.setVisible(false);

    let imageR = {
      url: '../assets/icons/cross_r2.png',
      size: new google.maps.Size(28, 22),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(13, 10)
    };
    /*var shape = {
                    coords: [ 1, 1, 1, 20, 20, 20, 20, 1 ],
                    type: "poly"
                };
                var iconMarker = new google.maps.Marker({
                    position: centerPlace,
                    map: map,
                    icon: image
                });*/

    this.selectionMarker = new google.maps.Marker({
      position: centerPlace,
      map: this.map,
      icon: imageR,
      draggable: true
    });
    this.selectionMarker.setVisible(true);

    this.selectionMarker.addListener('dragend', ev => {
      // latLng: _.N {lat: ƒ, lng: ƒ}
      // pixel: _.K {x: 26, y: -33}
      this.gameStateService.setCurrentMapMarker(ev.latLng);
    });

    this.map.addListener('click', event => {
      /*sv.getPanorama({
                        location: event.latLng,
                        radius: SEARCH_RADIUS
                    }, function(data, status) {
                        //coordsDiv.innerHTML = (["status: " + status, "" ])
                        if (status == google.maps.StreetViewStatus.OK) {
                            currNoti.setPosition(data.location.latLng);
                            currNoti.setContent(data.location.description);
                            currNoti.open(map);

                            console.log(data);

                            panorama.setPano(data.location.pano);
                        } else {
                            currNoti.close();
                            alert("Nothing found");
                        }
                    });*/

      /*rngView.getViewLatLng(event.latLng, function(data) {
                        console.log(data);

                        panorama.setPano(data.pano);

                        currNoti.setPosition(data.data.location.latLng);
                        currNoti.setContent(data.data.location.description);
                        currNoti.open(map);
                    });*/

      /*rngView.getViewRNG(function(data) {
                        console.log(data);

                        panorama.setPano(data.pano);

                        currNoti.setPosition(data.data.location.latLng);
                        currNoti.setContent(data.data.location.description);
                        currNoti.open(map);
                    });*/

      if (!this.selectionMarker) {
        this.selectionMarker = new google.maps.Marker({
          position: event.latLng,
          map: this.map
        });
      } else {
        this.selectionMarker.setPosition(event.latLng);
        this.selectionMarker.setVisible(true);
      }

      this.gameStateService.setCurrentMapMarker(event.latLng);

      /*var marker = new google.maps.Marker({
                        position: rngView.getLatLngRNG(),
                        map: map,
                        title: "Hello world"
                    });*/

      /*if (currCircle)
                        currCircle.setVisible(false);
                    currCircle = new google.maps.Circle({
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.7,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                        map: map,
                        center: event.latLng,
                        radius: SEARCH_RADIUS
                    });*/
    });

    // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
    //   position: { lat: 37.86926, lng: -122.254811 },
    //   pov: { heading: 165, pitch: 0 },
    //   zoom: 1,
    //   addressControl: false,
    //   disableDefaultUI: true,
    //   showRoadLabels: false
    // });

    /*var infoWin = new google.maps.InfoWindow();
                infoWin.setContent(Utils.getInfoText(Utils.getCoords(centerPlace, map.getZoom())));
                infoWin.setPosition(centerPlace);
                infoWin.open(map);*/

    /*map.addListener("zoom_changed", function() {
                    infoWin.setContent(Utils.getInfoText(Utils.getCoords(centerPlace, map.getZoom())));
                });*/
  }
  mouseEnter() {
    // google.maps.event.trigger(this.map, 'resize');
    console.log('lol');
    this.gmapElement.nativeElement.style.width = '400px';
    this.gmapElement.nativeElement.style.height = '400px';
  }

  mouseLeave() {
    // google.maps.event.trigger(this.map, 'resize');
    console.log('lol');
    this.gmapElement.nativeElement.style.width = '200px';
    this.gmapElement.nativeElement.style.height = '200px';

    // this.map.setCenter(this.selectionMarker.getPosition());
  }
}
