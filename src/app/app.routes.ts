import { Routes } from '@angular/router';
import { SignupComponent } from './components/misc/signup/signup.component';
import { LoginComponent } from './components/misc/login/login.component';

// Components
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '', redirectTo: 'parkings', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];





/*
import { CanLeavePhoneCreateGuard } from './shared/guards/can-leave-phone-create.guard';
import { PhoneBaseComponent } from './components/phone/phone-base/phone-base.component';
import { PhoneCreateComponent } from './components/phone/phone-create/phone-create.component';
import { PhoneDetailsResolverGuard } from './shared/resolvers/phone-details-resolver.guard';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { SignupComponent } from './components/misc/signup/signup.component';
import { LoginComponent } from './components/misc/login/login.component';
import { PhoneItemComponent } from './components/phone/phone-item/phone-item.component';
import { PhoneListComponent } from './components/phone/phone-list/phone-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'phones', pathMatch: 'full'},
  { path: 'phones', canActivate: [IsAuthenticatedGuard], component: PhoneListComponent},
  {
    path: 'phones',
    canActivate: [IsAuthenticatedGuard],
    component: PhoneBaseComponent,
    children: [
      {
        path: 'new',
        canActivate: [IsAuthenticatedGuard],
        canDeactivate: [CanLeavePhoneCreateGuard],
        component: PhoneCreateComponent
      },
      {
        path: ':id',
        canActivate: [IsAuthenticatedGuard],
        resolve: {
          phone: PhoneDetailsResolverGuard
        },
        component: PhoneItemComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
*/
