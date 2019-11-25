import { Injectable } from '@angular/core';
import faker from 'faker';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakerService {

  faker = faker;
  exampleCache$;

  constructor() { }

  getExample() {
    if (this.exampleCache$) return this.exampleCache$;

    const dataArray = [];
    for (let index = 1; index < 25; index++) {
      const userName = this.faker.internet.userName();
      const content = this.faker.hacker.phrase();
      const date = this.faker.date.recent();
      const data = { name, userName, content, date, index };
      dataArray.push(data);
    }

    this.exampleCache$ = of(dataArray);
    return this.exampleCache$
  }
}
