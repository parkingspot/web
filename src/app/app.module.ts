import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import './rxjs.operators';


import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { MapComponent } from './components/map/map.component';
import { ParkingsService } from './shared/services/parkings.service';

import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googlemapsapi
    })
  ],
  providers: [
    ParkingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
