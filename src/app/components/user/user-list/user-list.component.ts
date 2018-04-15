import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];
  user: any;
  apiError: string;

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sessionService.getUser() === null) {
      this.router.navigate(['/login']);
    } else if (this.sessionService.getUser().role === 'admin') {
      this.usersService.list()
        .subscribe((users) => this.users = users);
    } else {
      this.router.navigate(['/login']);
    }
  }
  onSubmitEdit(editForm) {
    let pos = this.findWithAttr(this.users, 'id', editForm.id)
    this.usersService.edit(this.users[pos])
      .subscribe(
        (user) => {
          this.users[pos] = editForm;
          this.router.navigate(['/user/list']);
        },
        (error) => {
          this.apiError = error;
        }
      );
  }
  onSubmitDelete(deleteForm) {
    let pos = this.findWithAttr(this.users, 'id', deleteForm.id);
    

    this.users.splice(pos, 1);
    this.usersService.delete(deleteForm.id)
      .subscribe(
        (user) => {
          this.router.navigate(['/user/list']);
          // this.router.navigateByUrl('/user/list');
        },
        (error) => {
          this.apiError = error;
        }
      );
  }

  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
}
