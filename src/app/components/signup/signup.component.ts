import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  public formGroup: FormGroup
  public submitSubscription: Subscription
  public error = null

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
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
      name: ['Derick Souza', Validators.required],
      email: ['derick_sm@hotmail.com', Validators.required],
      password: ['123456', Validators.required]
    })
  }

  submit(){
    let value = this.formGroup.value
    console.log(value)
    this.submitSubscription = this.loginService.signUp(value).subscribe(
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
