import { Parking } from './../../../shared/models/parking.model';
import { Component, OnInit } from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {

  parkings: Array<Parking> = [];
  parking: any;
  apiError: string;
  isAddressDisabled: Boolean = false;
  newParking: any;

  // Añadido
  searchControl: Array<FormControl> = [];
  location: Array<number> = [];
  address: String;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private parkingService: ParkingsService,
    private sessionService: SessionService,
    private router: Router,
    // Añadido
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    if (this.sessionService.getUser() === null) {
      this.router.navigate(['/login']);
    } else if (this.sessionService.getUser().role === 'company') {
      this.parkingService.listByUser()
        .subscribe((parkings) => {
          this.parkings = parkings;
          console.log(this.parkings)
          for ( let i = 0; i < this.parkings.length; i++ ) {
            this.searchControl[i] = new FormControl();
          }
        });
    } else if (this.sessionService.getUser().role === 'admin' ) {
      this.parkingService.list()
        .subscribe((parkings) => this.parkings = parkings);
    } else {
      this.router.navigate(['/login']);
    }




      // this.searchControl = new FormControl();


        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ['address']
          });
          autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
              // get the place result
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();
              // verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
              // set latitude, longitude and zoom
              console.log(place.geometry.location.lng());
              this.location[0] = place.geometry.location.lng();
              this.location[1] = place.geometry.location.lat();
              this.address = place.formatted_address;
            });
          });
        });


        /*
        setTimeout(() => {
          console.log(this.parkings);
          for ( let i = 0; i < this.parkings.length; i++ ) {
            this.searchControl[i] = new FormControl();
          }
        }, 5000);
        */


  }

  onSubmitEdit(editForm) {
    let pos;
    pos = this.findWithAttr(this.parkings, 'id', editForm.id);
    if (this.location[0] === undefined
      || this.location[1] === undefined
      || this.address === undefined ) {
        this.newParking = {
          ...this.parkings[pos],
          location: {
            type: 'Point',
            coordinates: [editForm.longitude, editForm.latitude]
          }
        };
      } else {
        this.newParking = {

          ...this.parkings[pos],
          location: {
            type: 'Point',
            coordinates: [this.location[0], this.location[1]]
          }
        };
        this.newParking.address = this.address
      }


    this.parkingService.edit(this.newParking)
      .subscribe(
        (parking) => {
          this.parkings[pos] = parking;
          this.router.navigate(['/parkings/list']);
        },
        (error) => {
          this.apiError = error;
        }
      );
  }

  onSubmitDelete(deleteForm) {
    let pos;
    pos = this.findWithAttr(this.parkings, 'id', deleteForm.id);
    this.parkings.splice(pos, 1);

    this.parkingService.delete(deleteForm.id)
      .subscribe(
        (parking) => {
          this.router.navigate(['/parkings/list']);
        },
        (error) => {
          this.apiError = error;
        }
      );
  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  toggleAddress() {
    console.log('cambio estado')
    console.log(this.isAddressDisabled)
    this.isAddressDisabled = !this.isAddressDisabled;
  }

  //Añadido
  // toggleDisable() {
  //   console.log("Hola")
  //   this.disableTextbox = !this.disableTextbox;
  // }
}
