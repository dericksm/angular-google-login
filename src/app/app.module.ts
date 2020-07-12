import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignUpComponent } from './components/signup/signup.component';
import { SignInComponent } from './components/signin/signin.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

import { GoogleLoginProvider } from 'angularx-social-login';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorInterceptor } from './interceptors/error-interceptor.interceptor';


@NgModule({
  declarations: [AppComponent, SignUpComponent, SignInComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, SocialLoginModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '242425157468-0as7hk6b6kec363v0u4543c5jk6iqobs.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
