import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../../shared/services/session.service';
import { Parking } from './../../../shared/models/parking.model';
import { Router } from '@angular/router';
import {ParkingsService} from '../../../shared/services/parkings.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-parking-create',
  templateUrl: './parking-create.component.html',
  styleUrls: ['./parking-create.component.css']
})
export class ParkingCreateComponent implements OnInit {

  parking: Parking = new Parking();
  apiError: string;

  constructor(
    private router: Router,
    /* private parkingsService: ParkingsService */) {
  }

  ngOnInit() { }

  onSubmitParking(parkingForm: NgForm) {
    console.log(this.parking);
    /*
    this.parkingsService.create(this.parking)
      .subscribe(
        (parking) => {
          parkingForm.reset();
          this.router.navigate(['/phones']);
        },
        (error) => {
          this.apiError = error;
        }
      );
      */
  }
}
