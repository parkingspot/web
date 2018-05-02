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
  lng = -3.718196;
  lat = 40.412972;
  zoom = 16;
  parkings: Array<Parking> = [];
  travelMode: String = 'BICYCLING';
  avoidHighways: Boolean = true;
  radius: Number = 600; fillColor: String = 'rgba(12,101,255,0.30)';
  infoWindowsArray: Array<any> = [];
  labelOptions: Array<Object> = [];
  icon: Array<Object> = [];
  renderOpts = {
    suppressMarkers: true,
  };
  here: Object = {
    url: require( '../../../../assets/img/HERE3.png'),
    scaledSize: {
      height: 50,
      width: 50
    }
  };

  public searchControl: FormControl;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor ( private parkingService: ParkingsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ) {
  }
  /*
  updatePosition() {
    this.lng = -3.718196;
    this.lat = 40.412972;
  }
  */

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
      });
    });
  });
    this.parkingService.near(this.location)
      .subscribe((parkings) => {
        this.parkings = parkings;
        // Sort
        if ( this.parkings.length > 0 ) {
          this.parkings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          let minPrice;
          minPrice = this.parkings[0].price;
          for (let i = 0; i < this.parkings.length; i++) {
            if (this.parkings[i].price === minPrice) {
              this.icon[i] = {
                url: require( '../../../../assets/img/GOLD2.png'),
                scaledSize: {
                  height: 60,
                  width: 60
                }
              };
            } else {
              this.icon[i] = {
                url: require( '../../../../assets/img/cool4.png'),
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
        }
      });
  }
  getDirection(i) {
    this.dir = {
      origin: {
        lng: this.lng,
        lat: this.lat
      },
      destination: {
        lng: this.parkings[i].location[0],
        lat: this.parkings[i].location[1]
      }
    };
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
