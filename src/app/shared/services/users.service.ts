import { Observable } from 'rxjs/Rx';
import { User } from './../models/user.model';
import {Http, Response} from '@angular/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService extends BaseApiService {
  private static readonly USERS_API = `${BaseApiService.BASE_API}/users`;

  constructor(private http: Http) {
    super();
  }

  public create(user: User): Observable<User> {
    return this.http.post(UsersService.USERS_API, JSON.stringify(user), BaseApiService.defaultOptions)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }
  public list(): Observable<Array<User>> {
    return this.http.get(UsersService.USERS_API, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  public edit(user: User): Observable<User> {
    return this.http.put(`${UsersService.USERS_API}/${user.id}`, JSON.stringify(user), BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  public delete(id: String): Observable<void> {
    return this.http.delete(`${UsersService.USERS_API}/${id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  /*
  public listByUser(): Observable<Array<Parking>> {
    return this.http.get(ParkingsService.PARKING_API + '/user', BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }
  public create(parking: Parking): Observable<Parking> {
    console.log('hello baby', parking)
    return this.http.post(ParkingsService.PARKING_API, JSON.stringify(parking), BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }
  public edit(parking: Parking): Observable<Parking> {
    // return this.http.put(`PhonesService.PHONES_API/${parking.id}`, parking.asFormData(), new RequestOptions({ withCredentials: true }))
    return this.http.put(`${ParkingsService.PARKING_API}/${parking.id}`, JSON.stringify(parking), BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }
  */
}
