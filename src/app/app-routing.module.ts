import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/components-app/page-not-found/page-not-found.component';
import { LoginComponent } from './components/components-app/login/login.component';
import { ShellComponent } from './components/components-app/header/shell.component';
import { FlashCardsGuard } from './guards/flash-cards.guard';
import { LandingComponent } from './components/components-app/landing/landing.component';
import { DirtyGuard } from './guards/dirty.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'flashCards',
        loadChildren: () => import('./components/components-practice/flash-cards/flash-cards.module').then(mod => mod.FlashCardsModule),
        canLoad: [FlashCardsGuard],
        canActivate: [FlashCardsGuard]
      },
      {
        path: 'manage',
        loadChildren: () => import('./components/components-manage/manage.module').then(mod => mod.ManageModule),
        canLoad: [FlashCardsGuard],
        canActivate: [FlashCardsGuard],
      },
      {
        path: 'guides',
        loadChildren: () => import('./components/components-guides/guides/guides.module').then(mod => mod.GuidesModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: LandingComponent
      },
      {path: '', redirectTo: '/home', pathMatch: 'full'},

    ]
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
