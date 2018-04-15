import { Parking } from './../../../shared/models/parking.model';
import { Component, OnInit } from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {

  parkings: Array<Parking> = [];
  parking: any;
  apiError: string;

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
        .subscribe((parkings) => this.parkings = parkings);
    } else if (this.sessionService.getUser().role === 'admin' ) {
      this.parkingService.list()
        .subscribe((parkings) => this.parkings = parkings);
    } else {
      this.router.navigate(['/login']);
    }
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
}
