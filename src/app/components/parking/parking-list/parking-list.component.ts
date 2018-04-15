import { Parking } from './../../../shared/models/parking.model';
import { Component, OnInit } from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

//Añadido
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

  // Añadido
  searchControl: FormControl;
  location: Array<number>;
  address: String;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private parkingService: ParkingsService,
    private sessionService: SessionService,
    private router: Router
    // Añadido
    ,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    if (this.sessionService.getUser() === null) {
      this.router.navigate(['/login']);
    } else if (this.sessionService.getUser().role === 'company') {
      this.parkingService.listByUser()
        .subscribe((parkings) => this.parkings = parkings);
    } else if (this.sessionService.getUser().role === 'admin' ) {
      this.parkingService.list()
        .subscribe((parkings) => this.parkings = parkings);
    } else {
      this.router.navigate(['/login']);
    }

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
              this.location[0] = place.geometry.location.lng();
              this.location[1] = place.geometry.location.lat();
              this.address = place.formatted_address;
            });
          });
        });

  }

  onSubmitEdit(editForm) {
    let pos = this.findWithAttr(this.parkings, 'id', editForm.id);
    const newParking = {
      ...this.parkings[pos],
      location: {
        type: 'Point',
        coordinates: [editForm.longitude, editForm.latitude]
      }
    };

    this.parkingService.edit(newParking)
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
    let pos = this.findWithAttr(this.parkings, 'id', deleteForm.id);
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
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  //Añadido
  // toggleDisable() {
  //   console.log("Hola")
  //   this.disableTextbox = !this.disableTextbox;
  // }
}
