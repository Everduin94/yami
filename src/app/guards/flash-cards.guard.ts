import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsGuard implements CanLoad, CanActivate {
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => !loggedIn ? this.router.navigate(['/']) : null)
    );
  }
  
  constructor(private auth: FirebaseAuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => !loggedIn ? this.router.navigate(['/']) : null)
    );
  }
}
