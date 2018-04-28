// import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import {Component, OnChanges, OnInit} from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { Parking } from '../../../shared/models/parking.model';
import { AgmDirectionModule } from 'agm-direction';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  location = undefined;
  dir = undefined;
  lng = -3.697588;
  lat = 40.391662;
  zoom = 14;
  parkings: Array<Parking> = [];
  travelMode: String = 'WALKING';
  avoidHighways: Boolean = true;
  radius: number = 3000; fillColor: string = 'rgba(255,95,41,1)';

  constructor( private parkingService: ParkingsService ) {
  }

  updatePosition() {
    this.lng = -3.697588;
    this.lat = 40.391662;
  }

  ngOnInit() {
    this.location = {
      type: 'Point', coordinates: [this.lng, this.lat]
    };
    this.parkingService.near(this.location)
      .subscribe((parkings) => this.parkings = parkings);
  }

  getDirection(i) {
    console.log('getDirection')
    this.dir = {
      origin: {
        lng: -3.697588,
        lat: 40.391662
      },
      destination: {
        lng: this.parkings[i].location[0],
        lat: this.parkings[i].location[1]
      }
    };

    console.log(this.parkings[i].location[0])
    console.log(this.parkings[i].location[1]);
  }
}
