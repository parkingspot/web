import {Component, OnChanges, OnInit} from '@angular/core';
import { ParkingsService } from '../../../shared/services/parkings.service';
import { Parking } from '../../../shared/models/parking.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 40.4146500;
  lng = -3.7004000;
  zoom = 14;
  parkings: Array<Parking> = [];
  backgroundColor: 'red';

  constructor( private parkingService: ParkingsService ) {
  }
  updatePosition() {
    this.lat = 40.432847;
    this.lng = -3.713961;
  }
  ngOnInit() {
    this.parkingService.list()
      .subscribe((parkings) => this.parkings = parkings);
  }
}
