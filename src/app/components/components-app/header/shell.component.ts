import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from '../../../models/theme.model';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/app/route-animations';
import {faRocket} from '@fortawesome/free-solid-svg-icons/faRocket';
import { ClientStateService } from 'src/app/services/client-state.service';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  animations: [
    fader
  ]
})
export class ShellComponent implements OnInit {

  readonly rocketIcon = faRocket;

  constructor(private themeService: ThemeService, public auth: FirebaseAuthService, private client: ClientStateService) { }

  ngOnInit() {
  }

  setNavigation(panel) {
    this.client.activeCard$.pipe(
      first(),
      tap((active:any) =>active.id ? this.client.updateNavigation(panel) : this.client.updateNavigation('details'))
    ).subscribe();
  }

  testLight() {
    this.themeService.toggleTheme(Theme.LIGHT);
  }

  testDark() {
    this.themeService.toggleTheme(Theme.DARK);
  }

  logout() {
    this.auth.signOut();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData; // && outlet.activatedRouteData['animation']
  }
}
