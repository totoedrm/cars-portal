import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddCarComponent } from './components/add-car/add-car.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Constants } from './utils/constants';

const routes: Routes = [
  {
    path: Constants.ROUTE_LOGIN,
    component: LoginComponent,
  },
  {
    path: Constants.ROUTE_HOME,
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: Constants.ROUTE_ADD_CAR,
    canActivate: [AuthGuard],
    component: AddCarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
