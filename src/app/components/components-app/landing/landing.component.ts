import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  landingVideo: Observable<string | null>;
    constructor(private storage: AngularFireStorage, private auth: FirebaseAuthService, private route: Router) {
       const ref = this.storage.ref('landing-page.mp4');
       this.landingVideo = ref.getDownloadURL();
    }

  ngOnInit() {
  }

  async loginClickEvent() {
    const auth = await this.auth.getUserId();
    if (!auth) this.route.navigate(['/login']);
    else this.route.navigate(['/manage'])
  }

}
