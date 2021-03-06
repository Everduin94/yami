import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {faRocket} from '@fortawesome/free-solid-svg-icons/faRocket';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors$;

  readonly rocket = faRocket;

  constructor(private auth: FirebaseAuthService) { }

  ngOnInit() {
    this.errors$ = this.auth.errors$;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signIn(provider);
  }

  githubLogin() {
     const provider = new firebase.auth.GithubAuthProvider();
     this.auth.signIn(provider);
  }

}
