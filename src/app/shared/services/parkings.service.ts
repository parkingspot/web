import { BaseApiService } from './base-api.service';
import { Parking } from '../models/parking.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParkingsService extends BaseApiService {
  private static readonly PARKING_API = `${BaseApiService.BASE_API}/parkings`;

  constructor(private http: Http) {
    super();
  }

  list(): Observable<Array<Parking>> {
    return this.http.get(ParkingsService.PARKING_API, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  /*
  get(id: string): Observable<Phone> {
    return this.http.get(`${PhonesService.PHONES_API}/${id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  create(phone: Phone): Observable<Phone> {
    return this.http.post(PhonesService.PHONES_API, phone.asFormData(), new RequestOptions({ withCredentials: true }))
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  edit(phone: Phone): Observable<Phone> {
    return this.http.put(`PhonesService.PHONES_API/${phone.id}`, phone.asFormData(), new RequestOptions({ withCredentials: true }))
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${PhonesService.PHONES_API}/${id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }
  */
}