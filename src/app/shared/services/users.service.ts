import { Observable } from 'rxjs/Rx';
import { User } from './../models/user.model';
import { Http } from '@angular/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService extends BaseApiService {
  private static readonly USERS_API = `${BaseApiService.BASE_API}/users`;

  constructor(private http: Http) {
    super();
  }

  create(user: User): Observable<User> {
    return this.http.post(UsersService.USERS_API, JSON.stringify(user), BaseApiService.defaultOptions)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

}