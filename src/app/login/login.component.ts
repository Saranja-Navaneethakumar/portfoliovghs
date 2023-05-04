import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginform : FormGroup = new FormGroup ({});


  jsonData: any = {
    "username": "saran",
    "password": "saran4"
  };

  constructor(public fb:FormBuilder, private router: Router,private sharedService: SharedService)
  {
    
  }

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
    // console.log(this.loginform.value);
    // console.log(this.loginform.valid);

    const username = this.loginform.value.username;
    const password = this.loginform.value.password;

    if(username == this.jsonData.username && password == this.jsonData.password)
    {
      console.log('hi');
      // this.alertMessage = 'Successfully Login!';
      this.sharedService.changeMessage('You have successfully logged in!');
      this.sharedService.printuser(this.jsonData.username);
      this.router.navigate(['/student']);
    }
    else{
      this.alertMessage = 'Invalid Login!';
      this.loginform.reset();
    }
  }

  get loginForm()
  {
      return this.loginform.controls;
  }

}
