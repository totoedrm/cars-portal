import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';
import { Constants } from 'src/app/utils/constants';

const numberOfCarsRequest = 6;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carList: Car[] = []
  colors: string[] = Constants.COLORS_LIST;
  loading: boolean = true;
  finishedLoading: boolean = false;
  user: SocialUser = {
    name: 'User',
    provider: '',
    id: '',
    email: '',
    photoUrl: '',
    firstName: '',
    lastName: '',
    authToken: '',
    idToken: '',
    authorizationCode: '',
    response: undefined
  }
  formGroup: FormGroup = new FormGroup({
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl('',),
    color: new FormControl(''),
  });

  brand: string = '';
  model: string = '';
  year: string = '';
  color: string = '';



  constructor(private readonly carService: CarsService, private readonly router: Router,) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(Constants.USER_STORAGE) ?? '{"name": "User"}');
    this.carService.getCars(0, numberOfCarsRequest, this.brand, this.model, this.year, this.color).subscribe((data) => {
      this.carList.push(...data); this.loading = false;
    });
  }

  onScroll(event: any) {
    let isAtEnd = event.target.offsetWidth + event.target.scrollLeft >= event.target.scrollWidth - 200 && !this.finishedLoading;
    if (isAtEnd && !this.loading) {
      this.loading = true;
      let currentNumberOfCars = this.carList.length;

      this.carService.getCars(this.carList.length, numberOfCarsRequest, this.brand, this.model, this.year, this.color).subscribe((data) => {
        this.carList.push(...data); this.loading = false;
        this.finishedLoading = this.carList.length < currentNumberOfCars + numberOfCarsRequest;
      });
    }
  }

  goToAddCar() {
    this.router.navigateByUrl(Constants.ROUTE_ADD_CAR);
  }

  onFormSubmit() {
    this.brand = this.formGroup.value['brand'] ?? '';
    this.model = this.formGroup.value['model'] ?? '';
    this.year = this.formGroup.value['year'] ?? '';
    this.color = this.formGroup.value['color'] ?? '';
    this.loading = true;
    this.carService.getCars(0, numberOfCarsRequest, this.brand, this.model, this.year, this.color).subscribe((data) => {
      this.carList = data; this.loading = false;
    });
  }

  clearFilters() {
    this.brand = '';
    this.model = '';
    this.year = '';
    this.color = '';
    this.carList = [];
    this.formGroup.reset({
      brand: [''],
      model: [''],
      year: [''],
      color: [''],
    });
    this.loading = true;
  }
}
