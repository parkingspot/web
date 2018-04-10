import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private SessionService: SessionService
  ) { }

  ngOnInit() {
  }

  onclickLogout() {
    console.log("ENTRA AL LOGOUT")
    this.SessionService.logout()
    .subscribe(() => {
      console.log("Entra al SUBSCRIBE")
      this.router.navigate(['/login']);
    }
  )};


}
