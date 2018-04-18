import { ParkingsService } from './../../../shared/services/parkings.service';
import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-user-parkings',
  templateUrl: './user-parkings.component.html',
  styleUrls: ['./user-parkings.component.css']
})
export class UserParkingsComponent implements OnInit {
  userParkings: Array<object> = [];

  //Añadido
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom = 17;

  constructor(private parkingsService: ParkingsService) { }

  ngOnInit() {
    this.parkingsService.listByUser()
      .subscribe((parkings) => {
        console.log(parkings)
        this.userParkings = parkings
    })
  }
  

}
