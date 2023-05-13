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
  isuser!: boolean;
  isstudent!:boolean;

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
      oldpassword : new FormControl('', Validators.compose([Validators.required])),
      newpassword : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
      confirmpw :  new FormControl('', Validators.required),
    },
    {validator: this.customvalidator.MatchPassword('newpassword', 'confirmpw')})

    
  }

  
  ngOnInit(): void {
    this.dataService.getDataFromJsonFile().subscribe(data => {
      localStorage.setItem('Admin', JSON.stringify(data));
    });
    this.loginform = this.fb.group(
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
        isadmin : new FormControl(false)
      }
    )
  }
  failalert!: string;
  successalert:string='';

  onSubmit(){
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;

    const isadmin = this.loginform.value.isadmin;
    // console.log(isadmin); 

    const currentItems = this.dataService.getItem('register') || [];
    // const students = this.dataService.getItem('students') || [];
    
    var filterdata = currentItems.filter((item: { username: any; }) => item.username == username);
    const userExist = currentItems.some((item: { username: any; }) => item.username === username);
    
    // var filterstudent = students.filter((item: { username: any; }) => item.username == username);
    // const studentExist = students.some((item: { username: any; }) => item.username === username);

    if(username == data.username)
    {
      if(username == data.username && password == data.password){
        this.sharedService.changeMessage('You have successfully logged in!');
        this.sharedService.printuser(username);
        this.sharedService.setloginstate(true);
        this.sharedService.setadmin(isadmin && data.username && data.password);
        if(isadmin && data.username && data.password){
          this.router.navigate(['/admin']);
        }
        else{
          this.failalert = 'Invalid Admin Login!';
          this.loginform.reset();
        }
      }
      else{
        this.failalert = 'Invalid Login Password not matched!';
        this.loginform.reset();
      }
    }
    else if(userExist)
    { for (var i = 0; i < filterdata.length; i++) {
        if(username == filterdata[i].username && password == filterdata[i].password){
          this.sharedService.changeMessage('You have successfully logged in!');
          this.sharedService.printuser(username);
          this.sharedService.setloginstate(true);
          this.sharedService.setemail(filterdata[i].email)
          this.dataService.setRegno(filterdata[i].regno);
          if(isadmin){
            this.failalert = 'You can not access Admin!';
            this.loginform.reset();
          }
          else{
            this.router.navigate(['/student']);
          }
          
        }
        else{
          this.failalert = 'Invalid Login Password not matched!';
          this.loginform.reset();
        }
       
      }
    }
    // else if(studentExist)
    // { for (var i = 0; i < filterstudent.length; i++) {
    //     if(username == filterstudent[i].username && password == filterstudent[i].password){
    //       this.sharedService.changeMessage('You have successfully logged in!');
    //       this.sharedService.printuser(username);
    //       this.sharedService.setloginstate(true);
    //       this.sharedService.setadmin(isadmin);
    //       this.sharedService.setemail(filterstudent[i].email)
    //       this.router.navigate(['/student']);
    //     }
    //   }
    // }

    else{
      this.failalert = 'Invalid Login User not exists!';
      this.loginform.reset();
    }

    if(isadmin && data.username && data.password){
      this.sharedService.sethide(false);
    }
    else{
      this.sharedService.sethide(true);
    }
    
  }

  onForget()
  {
    const email = this.forgetpwform.value.email;
    const passwordf = this.forgetpwform.value.passwordf;
    
    const currentItems = this.dataService.getItem('register') || [];
    const student = this.dataService.getItem('students') || [];
    const index = currentItems.findIndex((item: any) => item.email == email);
    const studentindex = student.findIndex((item: any) => item.email == email);

    var filterdata = currentItems.filter((item: { email: any; }) => item.email == email)

    const adminarray = this.dataService.getItem('Admin') || [];
    if(email == data.email)
    {
        data.password=passwordf;
        adminarray.password=passwordf;
        localStorage.setItem('Admin', JSON.stringify(adminarray));
        this.successalert = 'You have successfully updated password Admin! '+data.username;
        this.forgetpwform.reset();
    }
    else if(index !== -1)
    { 
      currentItems[index].password=passwordf;
      student[studentindex].password=passwordf;
      localStorage.setItem('register', JSON.stringify(currentItems));
      localStorage.setItem('students', JSON.stringify(student));
      this.successalert = 'You have successfully updated password! '+currentItems[index].username;
      this.forgetpwform.reset();
    }
    else{
        this.failalert = 'Invalid User Email not exists!';
        this.forgetpwform.reset();
    }
  }
    
  onresetpw()
  {
    const email = this.resetpwform.value.email;
    const newpassword = this.resetpwform.value.newpassword;
    const oldpassword = this.resetpwform.value.oldpassword;

    const currentItems = this.dataService.getItem('register') || [];
    const studentlist = this.dataService.getItem('students') || [];

    const index = currentItems.findIndex((item: any) => item.email == email);
    const studentindex = studentlist.findIndex((item: any) => item.email == email);

    const adminarray = this.dataService.getItem('Admin') || [];
    if(email == data.email)
    {
      if(data.password == oldpassword){
        data.password=newpassword;
        adminarray.password=newpassword;
        localStorage.setItem('Admin', JSON.stringify(adminarray));
        this.successalert = 'You have successfully reset password! '+data.username;
        this.resetpwform.reset();
      }
      else{
        this.failalert = 'Invalid previous password!';
        this.resetpwform.reset();
      }
    }
    else if((index !== -1))
    { 
      if(currentItems[index].password==oldpassword){
      currentItems[index].password=newpassword;
      studentlist[studentindex].password=newpassword;
      localStorage.setItem('register', JSON.stringify(currentItems));
      localStorage.setItem('students', JSON.stringify(studentlist));
      this.successalert = 'You have successfully reset password! '+ currentItems[index].username;
      this.resetpwform.reset();
    }
    else{
      this.failalert = 'Invalid previous password!';
      this.resetpwform.reset();
    }
    }
    else{
      this.failalert = 'Not registered User!';
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
