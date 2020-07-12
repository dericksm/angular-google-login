import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { LoginService } from '../../services/login.service';

import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  public formGroup: FormGroup
  public submitSubscription: Subscription
  public error = null

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private authService: SocialAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.createForm()
  }

  ngOnDestroy(): void {
    if(this.submitSubscription) this.submitSubscription.unsubscribe()
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      email: ['derick_sm@hotmail.com', Validators.required],
      password: ['123456', Validators.required]
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.authService.authState.subscribe((user) => {
      this.loginService.googleAuth(user.authToken).subscribe(res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/dashboard'])
      })

    })
  }

  submit(){
    let value = this.formGroup.value
    console.log(value)
    this.submitSubscription = this.loginService.signIn(value).subscribe(
      (res) => {
      if(!isNullOrUndefined(res.token)){
        localStorage.setItem('token', res.token)
      }
      this.router.navigate(['/dashboard'])
    },
      (res) => {
        console.log
        this.error = res.error.error
      }
      )
  }

}
