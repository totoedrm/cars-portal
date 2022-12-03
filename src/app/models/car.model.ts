export class Car {
    brand: string = '';
    model: string = '';
    km: string = '';
    year: string = '';
    shift: string = '';
    fuel: string = '';
    color: string = '';
    car_type: string = '';
    e_car: boolean = false
    damages: Damage[] = [];
}

export class Damage {
    damage: string = '';
    cost: string = '';
}