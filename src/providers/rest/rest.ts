import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = "http://localhost:8080"
  data: any;

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getTasks() {
    return new Promise(resolve => {
      this.http.get('path/to/data.json')
        .subscribe(data => {
          this.data = data;
          console.log(data);
          resolve(this.data);
        });
    });
  }

}
