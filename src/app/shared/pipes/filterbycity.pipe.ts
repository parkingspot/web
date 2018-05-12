import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbycity'
})
export class FilterbycityPipe implements PipeTransform {
  transform(users: any, cityTerm: any): any {
    if (cityTerm === undefined) {return users};
    return users.filter(function(user){
      return user.city.toLowerCase().includes(cityTerm.toLowerCase());
    })
  }
}
