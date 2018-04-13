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
  dir = undefined;
  lng = -3.697588;
  lat = 40.391662;
  zoom = 14;
  parkings: Array<Parking> = [];
  backgroundColor: 'red';

  constructor( private parkingService: ParkingsService ) {
  }

  updatePosition() {
    this.lng = -3.697588;
    this.lat = 40.391662;
  }

  ngOnInit() {
    this.parkingService.list()
      .subscribe((parkings) => this.parkings = parkings);
  }

  getDirection(i) {
    this.dir = {
      origin: {
        lat: 40.391662,
        lng: -3.697588
      },
      destination: {
        lat: this.parkings[i].location[1],
        lng: this.parkings[i].location[0]
      },
      avoidHighways: false,
      travelMode: 'WALKING'
    };
    console.log(this.parkings[i].location[0])
    console.log(this.parkings[i].location[1]);
  }
}
