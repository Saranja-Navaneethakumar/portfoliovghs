import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './student.model';


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

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  private _Student$ = new BehaviorSubject<Array<Student>>([]);
  Student$ = this._Student$.asObservable();
  
  // setStudent(student:Student[]){
  //   this._Student$.next(student)
  // }

  private _Regno$ = new BehaviorSubject<number>(0);
  Regno$ = this._Regno$.asObservable();

  setRegno(regno:number){
    this._Regno$.next(regno);
  }
}
