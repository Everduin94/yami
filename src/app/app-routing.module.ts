import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { LoginComponent } from './appComponents/login/login.component';
import { ShellComponent } from './appComponents/header/shell.component';
import { FlashCardsGuard } from './guards/flash-cards.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'flashCards',
        loadChildren: () => import('./featureComponents/flash-cards/flash-cards.module').then(mod => mod.FlashCardsModule),
        canLoad: [FlashCardsGuard],
        canActivate: [FlashCardsGuard]
      },
      {
        path: 'manage',
        loadChildren: () => import('./featureComponents/add-base/add-base.module').then(mod => mod.AddBaseModule),
        canLoad: [FlashCardsGuard],
        canActivate: [FlashCardsGuard]
      },
      {
        path: 'guides',
        loadChildren: () => import('./appComponents/guides/guides.module').then(mod => mod.GuidesModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },

    ]
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
