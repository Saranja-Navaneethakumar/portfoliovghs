import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandledataService {

  constructor(private http: HttpClient) { }

  private dataUrl = 'assets/data.json';

  getDataFromJsonFile() {
    return this.http.get('assets/data.json');
  }
  
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  //print data in localstorage browser

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  appendItem(key: string, newData: any) {
    const data: any[] = this.getItem(key);
    data.push(newData);
    this.setItem(key, data);
  }
  

}
