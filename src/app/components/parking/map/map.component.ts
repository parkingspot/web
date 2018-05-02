import { ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { Component, OnChanges, OnInit} from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { Parking } from '../../../shared/models/parking.model';
import { AgmDirectionModule } from 'agm-direction';

declare function require (path: string);

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
  zoom = 16;
  parkings: Array<Parking> = [];
  travelMode: String = 'BICYCLING';
  avoidHighways: Boolean = true;
  radius: Number = 3000; fillColor: String = 'rgba(12,101,255,0.30)';
  infoWindowsArray: Array<any> = [];
  labelOptions: Array<Object> = [];
  icon: Array<Object> = [];

  public searchControl: FormControl;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor ( private parkingService: ParkingsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ) {
  }
  updatePosition() {
    this.lng = -3.697588;
    this.lat = 40.391662;
  }

  ngOnInit() {
    this.location = {
      type: 'Point', coordinates: [this.lng, this.lat]
    };

    // create search FormControl
    this.searchControl = new FormControl();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        // set latitude, longitude and zoom
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.lng = place.geometry.location.lng();
      });
    });
  });
    this.parkingService.near(this.location)
      .subscribe((parkings) => {
        this.parkings = parkings;
        // Sort
        this.parkings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        let minPrice = this.parkings[0].price;
        for (let i = 0; i < this.parkings.length; i++) {
          this.icon[i] = {
            url: require( '../../../../assets/img/cool4.png'),
            scaledSize: {
              height: 60,
              width: 60
            }
          };
          if (this.parkings[i].price === minPrice) {
            this.icon[i] = {
              url: require( '../../../../assets/img/bubble.png'),
              scaledSize: {
                height: 60,
                width: 60
              }
            };
          }
          this.labelOptions[i] = {
            color: '#FFFFFF',
            // fontFamily: '',
            fontSize: '14px',
            // fontWeight: 'bold',
            text : parkings[i].price + ' €'
          };
        }
      });
  }
  getDirection(i) {
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

  pushInfoWindow(e) {
    for (let i = 0; i < this.infoWindowsArray.length; i++) {
      this.infoWindowsArray[i].close();
    }
    this.infoWindowsArray.push(e);
  }
  closeInfoWindow() {
    for (let i = 0; i < this.infoWindowsArray.length; i++) {
      this.infoWindowsArray[i].close();
    }
  }
}
