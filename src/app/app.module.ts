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

import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { LoginComponent } from './appComponents/login/login.component';
import { ShellComponent } from './appComponents/header/shell.component';
import { MainComponent } from './appComponents/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrototypeModule } from './appComponents/prototype/prototype.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartModule } from './featureComponents/start/start.module';
import { MdToHtmlModule } from './pipes/md-to-html.module';
import { FilterListModule } from './featureComponents/filter-list/filter-list.module';
import { FormComponentsModule } from './formComponents/form-components.module';
import { LandingComponent } from './appComponents/landing/landing.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingModule } from './libraryComponents/loading/loading.module';

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
    ReactiveFormsModule,
    FontAwesomeModule,
    LoadingModule,
    MatButtonModule,
    PrototypeModule,
    StartModule,
    FilterListModule,
    MdToHtmlModule,
    FormComponentsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
