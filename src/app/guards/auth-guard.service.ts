import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate() {
    if (this.loginService.isAuthenticated()) {
        // logged in so return true
        console.log('trueeeee')
        return true;
    }

    // not logged in so redirect to login page with the return url    
    this.router.navigate(['/login'])
    return false;
}
}