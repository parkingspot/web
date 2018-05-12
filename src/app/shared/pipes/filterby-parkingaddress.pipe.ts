import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyParkingaddress'
})
export class FilterbyParkingaddressPipe implements PipeTransform {

  transform(parkings: any, parkingaddressTerm: any): any {
    if (parkingaddressTerm === undefined) {return parkings};
    return parkings.filter(function(parking){
      return parking.address.toLowerCase().includes(parkingaddressTerm.toLowerCase());
    })
  }

}
