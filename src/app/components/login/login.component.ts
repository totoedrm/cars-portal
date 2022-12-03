import { SocialUser, GoogleLoginProvider, SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private readonly _authService: SocialAuthService, private readonly router: Router,) { }

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      localStorage.setItem(Constants.USER_STORAGE, JSON.stringify(user));
      this.router.navigateByUrl(Constants.ROUTE_HOME);
    });
  }

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
