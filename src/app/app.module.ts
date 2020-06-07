import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN } from '@angular/fire/functions';

import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './components/components-app/page-not-found/page-not-found.component';
import { LoginComponent } from './components/components-app/login/login.component';
import { ShellComponent } from './components/components-app/header/shell.component';
import { MainComponent } from './components/components-app/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrototypeModule } from './components/components-app/prototype/prototype.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToHtmlModule } from './pipes/md-to-html.module';
import { FilterListModule } from './components/components-practice/filter-list/filter-list.module';
import { FormComponentsModule } from './components/components-lib/form-components.module';
import { LandingComponent } from './components/components-app/landing/landing.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingModule } from './components/components-lib/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ShellComponent,
    MainComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LoadingModule,
    MatButtonModule,
    PrototypeModule,
    FilterListModule,
    MdToHtmlModule,
    FormComponentsModule,
    HttpClientModule
  ],
  providers: [
    { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5000' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
