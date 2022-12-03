import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Car } from '../models/car.model';

let carList: Car[] = [
  {
    brand: 'BMW',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Mercedes',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Toyota',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Skoda',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Fiat',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Ford',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Ducati',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Alfa Romeo',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Audi',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Ferrari',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'BMW',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Hyundai',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Citroen',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Dacia',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'BMW',
    model: '5.0',
    km: '100',
    year: '2018',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'black',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
  {
    brand: 'Jeep',
    model: 'AMG',
    km: '0',
    year: '2019',
    shift: 'automatic',
    fuel: 'benzin',
    color: 'white',
    car_type: 'sedan',
    e_car: false,
    damages: [],
  },
]

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handleRequests(request, next);
  }

  handleRequests(request: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = request;

    if (request.
      url.includes('cars')) {
      if (request.method == 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getCarList(request.params.get('lastIndex') ?? '0', request.params.get('numberOfCars') ?? '6', request.params.get('brand') ?? '', request.params.get('model') ?? '', request.params.get('year') ?? '', request.params.get('color') ?? '') })).pipe(delay(1000));
      } else {
        return of(new HttpResponse({ status: 200, body: this.addCarToList(request.body) }))
      }
    }
    else {
      return next.handle(request);
    }
  }

  getCarList(lastIndex: string, numberOfCars: string, brand: string, model: string, year: string, color: string): any {
    let carListNew: Car[] = carList;
    let yearInt = parseInt(year);
    if (isNaN(yearInt)) yearInt = 0;

    carListNew = carListNew.filter(
      function (car) {

        return (brand == '' || car.brand?.toUpperCase() === brand.toUpperCase()) && (model == '' || car.model?.toUpperCase() === model.toUpperCase())
          && (year == '' || parseInt(car.year ?? '1') > yearInt) && (color == '' || car.color?.toUpperCase() === color.toUpperCase());
      }
    );


    let startingIndex = parseInt(lastIndex);
    let numberOfCarsRequested = parseInt(numberOfCars);
    let endingIndex = carListNew.length;
    if (startingIndex >= carListNew.length) {
      startingIndex = carListNew.length;
    }
    if (startingIndex + numberOfCarsRequested < carListNew.length) {
      endingIndex = startingIndex + numberOfCarsRequested;
    }
    return carListNew.slice(startingIndex, endingIndex);
  }

  addCarToList(body: string): Car {
    let car: Car = JSON.parse(body);
    carList = [car].concat(carList);
    return car;
  }
}
