import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MdToHtmlPipe } from './pipes/md-to-html.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrototypeModule } from './appComponents/prototype/prototype.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCardComponent } from './featureComponents/add-base/add-card/add-card.component';
import { AddBaseComponent } from './featureComponents/add-base/add-base.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ShellComponent,
    MainComponent,
    MdToHtmlPipe,
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
    PrototypeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
