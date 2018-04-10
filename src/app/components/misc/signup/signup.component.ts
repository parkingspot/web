import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { UsersService } from './../../../shared/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = new User();
  apiError: string

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}


  onSubmitSignup(signupForm) {
    this.usersService.create(this.user).subscribe(
      (user) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.apiError = error.message;
      }
    );
  }
  
}
