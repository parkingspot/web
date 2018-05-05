import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmDirectionModule } from 'agm-direction';

// import './rxjs.operators';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { MapComponent } from './components/parking/map/map.component';

import {HttpModule} from '@angular/http';
import {routes} from './app.routes';
import {RouterModule} from '@angular/router';
import { NavComponent } from './components/misc/nav/nav.component';
import { LoginComponent } from './components/misc/login/login.component';
import { SignupComponent } from './components/misc/signup/signup.component';

// services
import { UsersService } from './shared/services/users.service';
import { SessionService } from './shared/services/session.service';
import { ParkingsService } from './shared/services/parkings.service';
import { ParkingCreateComponent } from './components/parking/parking-create/parking-create.component';
import { AutocompleteComponent } from './components/parking/autocomplete/autocomplete.component';

// Google Maps
import { ReactiveFormsModule } from '@angular/forms';
import { ParkingListComponent } from './components/parking/parking-list/parking-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserParkingsComponent } from './components/parking/user-parkings/user-parkings.component';
import { ParkingItemComponent } from './components/parking/parking-item/parking-item.component';




@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    ParkingCreateComponent,
    AutocompleteComponent,
    ParkingListComponent,
    UserListComponent,
    UserProfileComponent,
    UserParkingsComponent,
    ParkingItemComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.googlemapsapi,
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [
    ParkingsService,
    UsersService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
