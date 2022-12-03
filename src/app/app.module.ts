import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCarComponent } from './components/add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              //'473388186948-2t0cjnq3mhavbe51tuag5nmvmleegq9m.apps.googleusercontent.com'
              //'886271224528-do0pfgcfm9n368ihi2etfkmmfncdi8vt.apps.googleusercontent.com'
              '886271224528-45nmbh8hl667qtsv8g68f8cci3mmcjkt.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              //'473388186948-2t0cjnq3mhavbe51tuag5nmvmleegq9m.apps.googleusercontent.com'
              //'886271224528-do0pfgcfm9n368ihi2etfkmmfncdi8vt.apps.googleusercontent.com'
              '1110625386263152'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
