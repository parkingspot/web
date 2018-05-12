import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyParkingname'
})
export class FilterbyParkingnamePipe implements PipeTransform {

  transform(parkings: any, parkingnameTerm: any): any {
    if (parkingnameTerm === undefined) {return parkings};
    return parkings.filter(function(parking){
      return parking.name.toLowerCase().includes(parkingnameTerm.toLowerCase());
    })
  }

}
