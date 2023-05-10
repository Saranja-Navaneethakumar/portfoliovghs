import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import data from './../../assets/data.json';
import { HandledataService } from '../handledata.service';
import { CustomvalidationService } from '../customvalidation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginform : FormGroup = new FormGroup ({});
  forgetpwform : FormGroup = new FormGroup ({});
  resetpwform : FormGroup = new FormGroup({});

  constructor(
    public fb:FormBuilder, 
    private router: Router,
    private sharedService: SharedService,
    private dataService:HandledataService,
    private customvalidator:CustomvalidationService)
  {
    this.forgetpwform = this.fb.group(
      {
        email : new FormControl('', [Validators.required, Validators.email]),
        passwordf : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
        confirmpasswordf : new FormControl('', Validators.required),
      },
      {validator: this.customvalidator.MatchPassword('passwordf', 'confirmpasswordf')}
    )

    this.resetpwform = this.fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      oldpassword : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
      newpassword : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
      confirmpw :  new FormControl('', Validators.required),
    },
    {validator: this.customvalidator.MatchPassword('newpassword', 'confirmpw')})
  }

  
  ngOnInit(): void {
    this.dataService.getDataFromJsonFile().subscribe(data => {
      localStorage.setItem('myData', JSON.stringify(data));
    });
    this.loginform = this.fb.group(
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required)
      }
    )
  }
  failalert!: string;
  successalert:string='';

  onSubmit(){
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;

    const currentItems = this.dataService.getItem('items') || [];
    //try myData localstorage   
    var filterdata = currentItems.filter((item: { username: any; }) => item.username == username)
    if(username == data.username)
    {
      if(username == data.username && password == data.password){
        this.sharedService.changeMessage('You have successfully logged in!');
        this.sharedService.printuser(username);
        this.sharedService.setloginstate(true);
        this.sharedService.setemail(data.email)
        this.router.navigate(['/student']);
      }
      else{
        this.failalert = 'Invalid Login!';
        this.loginform.reset();
      }
    }
    else
    { for (var i = 0; i < filterdata.length; i++) {
        if(username == filterdata[i].username && password == filterdata[i].password){
          this.sharedService.changeMessage('You have successfully logged in!');
          this.sharedService.printuser(username);
          this.sharedService.setloginstate(true);
          this.sharedService.setemail(filterdata[i].email)
          this.router.navigate(['/student']);
        }
        else{
          this.failalert = 'Invalid Login!';
          this.loginform.reset();
        }
      }
    }
  }

  onForget()
  {
    const email = this.forgetpwform.value.email;
    const passwordf = this.forgetpwform.value.passwordf;
    const confirmpasswordf = this.forgetpwform.value.confirmpasswordf;

    const currentItems = this.dataService.getItem('items') || [];

    const index = currentItems.findIndex((item: any) => item.email == email);
    
    var filterdata = currentItems.filter((item: { email: any; }) => item.email == email)

    if(email == data.email)
    {
        data.password=passwordf;
        this.successalert = 'You have successfully updated password! '+data.username;
    }
    else if(index !== -1)
    { 
      currentItems[index].password=passwordf;
      console.log(currentItems[index].password)
      localStorage.setItem('items', JSON.stringify(currentItems));
          this.successalert = 'You have successfully updated password! '+currentItems[index].username;
    }
    else{
          this.failalert = 'Invalid User!';
          this.forgetpwform.reset();
    }
  }
    
  onresetpw()
  {
    const email = this.resetpwform.value.email;
    const newpassword = this.resetpwform.value.newpassword;
    const oldpassword = this.resetpwform.value.oldpassword;
    const confirmpw = this.resetpwform.value.confirmpw;

    const currentItems = this.dataService.getItem('items') || [];

    const index = currentItems.findIndex((item: any) => item.email == email);
    if((email == data.email)&& (data.password == oldpassword))
    {
        data.password=newpassword;
        this.successalert = 'You have successfully reset password! '+data.username;
    }
    else if((index !== -1)&& (currentItems[index].password=oldpassword))
    { 
      currentItems[index].password=newpassword;
      console.log(currentItems[index].password)
      localStorage.setItem('items', JSON.stringify(currentItems));
      this.successalert = 'You have successfully reset password! '+ currentItems[index].username;
    }
    else{
          this.failalert = 'Invalid User!';
          this.resetpwform.reset();
    }
  }
  
  get loginForm(){
    return this.loginform.controls;
  }

  get forgetForm(){
    return this.forgetpwform.controls;
  }

  get resetForm(){
    return this.resetpwform.controls;
  }
  

}
