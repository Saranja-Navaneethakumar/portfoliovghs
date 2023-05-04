import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private message = new BehaviorSubject<string>('');
  currentMessage = this.message.asObservable();

  private loginusername = new BehaviorSubject<string>('');
  user = this.loginusername.asObservable();
  
  constructor() { }

  changeMessage(message: string) {
    this.message.next(message)
  }

  printuser(name:string)
  {
    this.loginusername.next(name)
  }

}
