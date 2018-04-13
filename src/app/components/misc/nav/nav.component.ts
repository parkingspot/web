import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.userSubscription = this.sessionService.onUserChanges()
      .subscribe(user => this.user = user);
    console.log(this.user);
  }
/*
    ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
 */

  onclickLogout() {
    this.sessionService.logout()
    .subscribe(() => {
      this.router.navigate(['/login']);
    }
  ); }
}
