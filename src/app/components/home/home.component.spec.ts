import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, SocialLoginModule, ReactiveFormsModule, FormsModule,],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should find default username', () => {
    expect(component.user.name).toEqual("User");
  })
  it('Should render greetings to User', () => {
    const input = document.querySelector('h2') as HTMLInputElement | null;

    expect(input?.textContent).toEqual("Hello, User");
  })
});
