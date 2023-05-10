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
  
  private loginstate = new BehaviorSubject<boolean>(false);
  login = this.loginstate.asObservable();

  private viewdetails = new BehaviorSubject<boolean>(false);
  view = this.viewdetails.asObservable();

  private email = new BehaviorSubject<string>('');
  useremail = this.email.asObservable();


  constructor() { }

  changeMessage(message: string) {
    this.message.next(message)
  }

  printuser(name:string)
  {
    this.loginusername.next(name)
  }

  setloginstate(state:boolean)
  {
    this.loginstate.next(state)
  }

  setviewdetails(state:boolean)
  {
    this.viewdetails.next(state)
  }

  setemail(email:string)
  {
    this.email.next(email)
  }
}
