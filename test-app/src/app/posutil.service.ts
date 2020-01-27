import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { google } from 'google-maps';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class PosutilService {
  RANDOM_POS_URL = 'http://localhost:3000/getPosition/random';
  CITY_POS_URL = 'http://localhost:3000/getPosition/city_eu';
  CITY_POS_BYID_URL = 'http://localhost:3000/getPosition/city_eu/'; // + id

  serviceProvider: google.maps.StreetViewService;
  radius;

  constructor(private httpClient: HttpClient) {
    this.serviceProvider = new google.maps.StreetViewService();
    this.radius = 1000000;
  }

  getViewFromLatLng(latLng: google.maps.LatLng) {
    return new Promise((resolve, reject) => {
      this.serviceProvider.getPanorama(
        { location: latLng, radius: this.radius },
        (data: google.maps.StreetViewPanoramaData, status: google.maps.StreetViewStatus) => {
          console.log('STREETVIEW STATUS: ', status);
          console.log('--------------------');
          console.log('Streetview data: ', data);
          // @ts-ignore
          if (status === google.maps.StreetViewStatus.OK) {
            resolve(data);
          } else if (status === google.maps.StreetViewStatus.ZERO_RESULTS) {
            reject('ZERO_RESULTS');
          } else if (status === google.maps.StreetViewStatus.UNKNOWN_ERROR) {
            reject('UNKNOWN_ERROR');
          } else {
            reject('UNKNOWN_ERROR');
          }
        }
      );
    });
  }
  getLatLngRNG() {
    return new google.maps.LatLng(
      Math.round(Math.random() * 170 * 1000) / 1000 - 85,
      Math.round(Math.random() * 356 * 1000) / 1000 - 178
    );
  }

  fetchCityPosition() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.CITY_POS_URL)
        .toPromise()
        .then((data: any) => {
          console.log('GOT CITY POSITION: ', data);

          this.getViewFromLatLng(new google.maps.LatLng(data.lat, data.lon))
            .then((latLon: any) => {
              latLon.ownId = data.id;
              console.log('latLong with id:', latLon);
              resolve(latLon);
            })
            .catch(err => reject(err));
        })
        .catch(err => {
          console.log('ERROR FETCHING CITY POSITION: ', err);
          reject(err);
        });
    });
  }

  fetchCityById(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.CITY_POS_BYID_URL + id)
        .toPromise()
        .then((data: any) => {
          console.log('GOT CITY BY ID POSITION: ', data);

          this.getViewFromLatLng(new google.maps.LatLng(data.lat, data.lon))
            .then((latLon: any) => {
              latLon.ownId = data.id;
              console.log('latLong with id:', latLon);
              resolve(latLon);
            })
            .catch(err => reject(err));
        })
        .catch(err => {
          console.log('ERROR FETCHING CITY BY ID: ', err);
          reject(err);
        });
    });
  }

  fetchRandomPosition() {
    this.httpClient
      .get(this.CITY_POS_URL)
      .toPromise()
      .then(data => {
        console.log('GOT CITY POSITION: ', data);
      })
      .catch(err => console.log('ERROR FETCHING CITY POSITION: ', err));
  }

  calculateDistance(point1: google.maps.LatLng, point2: google.maps.LatLng) {
    const R = 6378137; // Constant 6378137 represents earth radius.
    const lat1 = point1.lat();
    const lat2 = point2.lat();
    const lon1 = point1.lng();
    const lon2 = point2.lng();

    let dLat = this.toRadian(lat2 - lat1);
    let dLon = this.toRadian(lon2 - lon1);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadian(lat1)) *
        Math.cos(this.toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadian(deg) {
    return (deg * Math.PI) / 180;
  }
}
