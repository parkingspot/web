import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parking } from './../../../shared/models/parking.model';
import { NgForm } from '@angular/forms';
import { ParkingsService } from '../../../shared/services/parkings.service';

import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ElementRef, ViewChild, NgZone } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-parking-item',
  templateUrl: './parking-item.component.html',
  styleUrls: ['./parking-item.component.css']
})
export class ParkingItemComponent implements OnInit {
  // parking: any;
  // Añadido
  searchControl: FormControl;
  location: Array<number> = [];
  address: String;
  isAddressDisabled: Boolean = false;
  apiError: string;
  newParking: any;
  @Input() parking: any;
  @Output() onDelete = new EventEmitter<string>();
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private parkingService: ParkingsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    // create search FormControl
    this.searchControl = new FormControl();
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

  }
  onSubmitEdit(editForm) {
    // let pos;
    // pos = this.findWithAttr(this.parkings, 'id', editForm.id);
    if (this.location[0] === undefined
      || this.location[1] === undefined
      || this.address === undefined ) {
      this.newParking = {
        ...this.parking,
        location: {
          type: 'Point',
          coordinates: [editForm.longitude, editForm.latitude]
        }
      };
    } else {
      this.newParking = {

        ...this.parking,
        location: {
          type: 'Point',
          coordinates: [this.location[0], this.location[1]]
        }
      };
      this.newParking.address = this.address;
    }
    this.parkingService.edit(this.newParking)
      .subscribe(
        (parking) => {
          this.parking = parking;
          this.router.navigate(['/parkings/list']);
        },
        (error) => {
          this.apiError = error;
        }
      );
  }

  onSubmitDelete(deleteForm) {
    // this.parkings.splice(pos, 1); // IMPORTANTE NO BORRAR
    this.onDelete.emit(this.parking.id);
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

  toggleAddress() {
    this.isAddressDisabled = !this.isAddressDisabled;
  }
}
