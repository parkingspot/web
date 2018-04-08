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
  parking: Parking;
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
    this.parkingService.list()
      .subscribe((parkings) => this.parkings = parkings);
    
  }


  onSubmitEdit($event) {
    // let pos = this.parkings.map(function(e) { return e.id; }).indexOf($event.path[0][5].value);

    // console.log(pos);

    // this.parking = this.parkings[0];
    const newParking = {
      ...this.parkings[0],
      location: new Array(this.longitude, this.latitude)
      // address: this.address
    };
    // console.log($event.path[0][5].value);

  
  
    // const newParking = {
      
      // ...this.parking,
      // location: new Array(this.location[0], this.location[1]),
      // address: this.address
    // };



    
      this.parkingService.edit(this.parking)
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
}
