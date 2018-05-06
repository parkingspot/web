import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { SessionService } from './../../../shared/services/session.service';
import { Parking } from './../../../shared/models/parking.model';
import { Router } from '@angular/router';
import {ParkingsService} from '../../../shared/services/parkings.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

declare function require (path: string);

@Component({
  selector: 'app-parking-create',
  templateUrl: './parking-create.component.html',
  styleUrls: ['./parking-create.component.css']
})
export class ParkingCreateComponent implements OnInit {

  parking: Parking = new Parking();
  apiError: string;
  // Descomentado
  lat: number;
  lng: number;
  location: Array<number>;
  searchControl: FormControl;
  zoom: number;
  address: string;
  labelOption: Object;
  here: Object = {
    url: require( '../../../../assets/img/cool4.png'),
    scaledSize: {
      height: 80,
      width: 80
    }
  };

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
      private router: Router,
      private parkingsService: ParkingsService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
    ) {
  }

  ngOnInit() {
    this.labelOption  = {
      color: '#ffffff',
      fontSize: '20px',
      fontWeight: 'bold',
      text: 'P'
    };
    // set google maps defaults
    this.zoom = 18;
    this.location = [-3.718196, 40.412972];

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    // setTimeout(() => this.setCurrentPosition(), 3000);
    // this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get tdeclare function require (path: string);he place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.location[0] = place.geometry.location.lng();
          this.location[1] = place.geometry.location.lat();
          this.address = place.formatted_address;
        });
      });
    });
  }

  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //         this.location[0] = position.coords.longitude;
  //     // setTimeout(() => this.setCurrentPosition(), 3000);        this.location[1] = position.coords.latitude;
  //         this.zoom = 18;
  //       }
  //     );
  //   }
  // }

  onSubmitParking(/*parkingForm: NgForm*/) {
  const newParking = {
    ...this.parking,
    location: new Array(this.location[0], this.location[1]),
    address: this.address
  };
    this.parkingsService.create(newParking)
      .subscribe(
        (parking) => {
          this.parking = new Parking();
          this.router.navigate(['/parkings']);
        },
        (error) => {
          this.apiError = error;
        }
      );
  }

  markerDragEnd($event) {
    this.location[0] = $event.coords.lng;
    this.location[1] = $event.coords.lat;
  }
}
