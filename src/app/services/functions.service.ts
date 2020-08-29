import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private auth: FirebaseAuthService, private http: HttpClient) { }


  async removeDeckOrGroup(params) {
     return await this.auth.getUserIdOrCancel(userId => {

      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: { ...params, userId },
      };

      return this.http.delete('https://us-central1-yami-backend.cloudfunctions.net/api/decks', options).pipe(
        take(1)
      )
    });
  }

  async updateDeckOrGroup(params) {
    const result = await this.auth.getUserIdOrCancel(userId => {

     const options = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
     };

     const body = { ...params, userId }

     return this.http.post('https://us-central1-yami-backend.cloudfunctions.net/api/decks', body, options).pipe(
       take(1)
     )
   });
 }
}
