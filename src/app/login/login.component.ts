import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import data from './../../assets/data.json';
import { HandledataService } from '../handledata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginform : FormGroup = new FormGroup ({});
  forgetpwform : FormGroup = new FormGroup ({});

  constructor(public fb:FormBuilder, private router: Router,private sharedService: SharedService,
    private dataService:HandledataService)
  {}

  ngOnInit(): void {
   
    this.loginform = this.fb.group(
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required)
      }
    )
  }

  alertMessage!: string;
  

  onSubmit(){
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;

    const currentItems = this.dataService.getItem('items') || [];
    
    var filterdata = currentItems.filter((item: { username: any; }) => item.username == username)

    if(username == data.username)
    {
      if(username == data.username && password == data.password)
      {
        this.sharedService.changeMessage('You have successfully logged in!');
        this.sharedService.printuser(username);
        this.router.navigate(['/student']);
      }
    
      else{
        this.alertMessage = 'Invalid Login!';
        this.loginform.reset();
      }
    }
    else
    {

      for (var i = 0; i < filterdata.length; i++) {
        if(username == filterdata[i].username && password == filterdata[i].password)
        {
          this.sharedService.changeMessage('You have successfully logged in!');
          this.sharedService.printuser(username);
          this.router.navigate(['/student']);
        }
      
        else{
          this.alertMessage = 'Invalid Login!';
          this.loginform.reset();
        }
      }
    }
    
  }

  get loginForm()
  {
    return this.loginform.controls;
  }

}
