import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenSTorageService: TokenStorageService
  ) { }

  canActivate(): boolean {

    if (this.tokenSTorageService.getToken()) {
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
