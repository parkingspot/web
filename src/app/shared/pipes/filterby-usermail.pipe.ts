import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyUsermail'
})
export class FilterbyUsermailPipe implements PipeTransform {

  transform(users: any, emailTerm: any): any {
    if (emailTerm === undefined) {return users};
    return users.filter(function(user){
      return user.email.toLowerCase().includes(emailTerm.toLowerCase());
    })
  }

}
