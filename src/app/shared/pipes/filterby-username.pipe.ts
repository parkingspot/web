import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyUsername'
})
export class FilterbyUsernamePipe implements PipeTransform {

  transform(users: any, nameTerm: any): any {
    if (nameTerm === undefined) {return users};
    return users.filter(function(user){
      return user.name.toLowerCase().includes(nameTerm.toLowerCase());
    })
  }

}
