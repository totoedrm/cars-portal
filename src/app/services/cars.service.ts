import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Car } from '../models/car.model';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getCars(index: number, numberOfCarsRequest: number, brand: string, model: string, year: string, color: string): Observable<Car[]> {
    return this.http.get<Car[]>(
      environment.backend_endpoint + Constants.CARS,
      { params: { lastIndex: index, numberOfCars: numberOfCarsRequest, brand: brand, model: model, year: year, color: color } }
    );
  }

  saveCar(car: Car) {
    return this.http.post<Car>(environment.backend_endpoint + Constants.CARS, JSON.stringify(car));
  }
}
