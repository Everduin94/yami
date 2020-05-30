import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsGuard implements CanLoad, CanActivate {
  
  constructor(private auth: FirebaseAuthService, private router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    return await this.isAuthenticated();
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return await this.isAuthenticated();
  }

  private async isAuthenticated() {
    const userId = await this.auth.getUserId();
    return userId ? true : this.router.navigate(['/']);
  }
}
