import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngularAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      // Optionally: validate token expiration by decoding it (using a library like jwt-decode)
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
