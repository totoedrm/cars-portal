import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';
import { Constants } from 'src/app/utils/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {

  constructor(private _formBuilder: FormBuilder,
    private readonly carService: CarsService, private readonly router: Router,
    private location: Location) { }

  firstFormGroup = this._formBuilder.group({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    color: new FormControl('', Validators.required),
    km: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    shift: new FormControl('',),
    fuel: new FormControl('',),
    car_type: new FormControl('',),
    e_car: new FormControl(false,),
  });
  secondFormGroup = this._formBuilder.group({
    damages: this._formBuilder.array([]),
  });

  get brand() { return this.firstFormGroup.get('brand'); }
  get model() { return this.firstFormGroup.get('model'); }
  get year() { return this.firstFormGroup.get('year'); }
  get color() { return this.firstFormGroup.get('color'); }

  colors: string[] = Constants.COLORS_LIST;
  types: string[] = Constants.CAR_TYPES;
  fuels: string[] = Constants.CAR_FUELS;
  shifts: string[] = Constants.CAR_SHIFTS;
  ischeck: boolean = false;

  showType() {
    console.log(this.firstFormGroup.controls["e_car"].value);
    return this.firstFormGroup.controls["e_car"].value;
  }

  check() {
    this.ischeck = !this.ischeck;
  }

  newDamage() {
    return this._formBuilder.group({
      damage: '',
      price: '',
    })
  }

  get damages() {
    return this.secondFormGroup.get("damages") as FormArray;
  }

  addDamage() {
    this.damages.push(this.newDamage());
  }

  removeQuantity(i: number) {
    this.damages.removeAt(i);
  }

  onSubmit() {
    let car: Car = new Car();
    Object.assign(car, this.firstFormGroup.value);
    //this.firstFormGroup.patchValue(car);
    //this.secondFormGroup.patchValue(car);
    this.carService.saveCar(car).subscribe((data) => {
      this.location.back();
    });
  }
}
