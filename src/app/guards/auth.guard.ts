import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor( private servi: AuthService,
             private router: Router) {}
  canActivate(): boolean {
    
    if (this.servi.autenticado()) {
return true;
    } else {
  this.router.navigateByUrl('/login');
  return false;
     }
  }

}
