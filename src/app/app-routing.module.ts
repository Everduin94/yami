import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { LoginComponent } from './appComponents/login/login.component';
import { ShellComponent } from './appComponents/header/shell.component';
import { MainComponent } from './appComponents/main/main.component';
import { FlashCardsGuard } from './guards/flash-cards.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'examples',
        loadChildren: () => import('./featureComponents/examples/examples.module').then(mod => mod.ExamplesModule),
      },
      {
        path: 'flashCards',
        loadChildren: () => import('./featureComponents/flash-cards/flash-cards.module').then(mod => mod.FlashCardsModule),
        canLoad: [FlashCardsGuard],
        canActivate: [FlashCardsGuard]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
