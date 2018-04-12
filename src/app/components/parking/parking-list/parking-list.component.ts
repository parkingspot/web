import { Parking } from './../../../shared/models/parking.model';
import { Component, OnInit } from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// import { print } from 'util';
// import { User } from './../../../shared/models/user.model';



@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {

  parkings: Array<Parking> = [];
  parking: any;
  apiError: string;
  idEnviado: number;
  longitude: number;
  latitude: number;

  constructor(
    private parkingService: ParkingsService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.parkingService.listByUser()
      .subscribe((parkings) => this.parkings = parkings);
console.log();
  }


  onSubmitEdit(editForm, index) {
    // let pos = this.parkings.map(function(e) { return e.id; }).indexOf($event.path[0][5].value);
    // console.log(editForm)
    console.log(this.parkings[index])
    const newParking = {
      ...this.parkings[index],
      location: {
        type: 'Point',
        coordinates: new Array(editForm.longitude, editForm.latitude)
      },
    };

    this.parkingService.edit(newParking)
      .subscribe(
        (parking) => {
          console.log('Nuevo parking =>')
          console.log(parking)
          this.parkings[index] = parking;
          this.router.navigate(['/parkings']);
        },
        (error) => {
          this.apiError = error;
        }
      );

  }

  onSubmitDelete(deleteForm, index) {
    // let pos = this.parkings.map(function(e) { return e.id; }).indexOf($event.path[0][5].value);
    // console.log(editForm)
    /*
    console.log(this.parkings[index])
    const newParking = {
      ...this.parkings[index],
      location: {
        type: 'Point',
        coordinates: new Array(editForm.longitude, editForm.latitude)
      },
    };
    */

    this.parkingService.delete(deleteForm.id)
      .subscribe(
        (parking) => {
          console.log('Parking borrado =>')
          console.log(parking)
          // this.parkings[index] = parking;
          this.router.navigate(['/parkings']);
        },
        (error) => {
          this.apiError = error;
        }
      );

  }



}
