import { Component, OnInit } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { SessionService } from './../../../shared/services/session.service';
import { UsersService } from '../../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  apiError: String;
  // showParkings: Boolean = false;

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    console.log(this.user);
  }

  onSubmitEdit(editForm) {
    // this.sessionService.setUser(this.user);
   
    this.usersService.edit(this.user)
      .subscribe(
        (user) => {
          this.user = editForm;
          this.sessionService.logout()
          this.router.navigate(['/login']);
        },
        (error) => {
          this.apiError = error;
        }
      );
  }


  // buttonClick() {
  //   cambia el showParkings a true
  // }
  
}
