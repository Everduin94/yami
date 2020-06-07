import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  landingVideo: Observable<string | null>;
    constructor(private storage: AngularFireStorage) {
       const ref = this.storage.ref('landing-page.mp4');
       this.landingVideo = ref.getDownloadURL();
    }

  ngOnInit() {
  }

}
