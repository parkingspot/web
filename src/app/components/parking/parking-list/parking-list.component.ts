import { FilterbyParkingnamePipe } from './../../../shared/pipes/filterby-parkingname.pipe';
import { Parking } from './../../../shared/models/parking.model';
import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
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
  // PRINCIPIO BORRAR
  searchControl: Array<FormControl> = [];
  location: Array<number> = [];
  address: String;
  isAddressDisabled: Boolean = false;
  // FIN BORRAR

  parkingnameTerm : String;
  parkingaddressTerm : String;

  parkings: Array<Parking> = [];
  parking: any;



  constructor(
    private parkingService: ParkingsService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sessionService.getUser() === null) {
      this.router.navigate(['/login']);
    } else if (this.sessionService.getUser().role === 'company') {
      this.parkingService.listByUser()
        .subscribe((parkings) => {
          this.parkings = parkings;
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
  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  removeParking(id) {
    let removeIndex;
    removeIndex  = this.parkings.map(function(item) { return item.id; })
      .indexOf(id);
    this.parkings.splice(removeIndex, 1);
  }
}
