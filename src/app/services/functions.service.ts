import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private fns: AngularFireFunctions, private http: HttpClient) { }


  testCall() {
    this.http.delete('http://localhost:5000/yami-backend/us-central1/api/cat').subscribe(console.log);

    // This is a POST
    /*const callable = this.fns.httpsCallable('api/cat');
    callable({ name: 'some-data' }).subscribe(console.log);*/
  }
}
