import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CustomvalidationService } from '../customvalidation.service';
import { HandledataService } from '../handledata.service';
import {  FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Student } from './../student.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminpanel:boolean|undefined;
  successalert!: string;
  failurealert!:string;
  user!: string;
  message!: string;
  deletesuccessalert!: string;
  deletefailurealert!: string;
  editfailurealert!: string;
  editsuccessalert!: string;
  // addstudentpage: boolean=false;
  // viewtable: boolean = false;
  // editstudentview:boolean = false;
  
  constructor(private sharedService: SharedService,public fb:FormBuilder, private customvalidator:CustomvalidationService,
    private datastore:HandledataService) { 
    this.sharedService.admindash.subscribe(data=>this.adminpanel=data),
    this.sharedService.user.subscribe(name => this.user = name),
    this.sharedService.currentMessage.subscribe(message => this.message = message)
  }

  adduserform : FormGroup = new FormGroup ({});
  edituserform : FormGroup = new FormGroup ({});

  ngOnInit(): void {
    this.adduserform = this.fb.group(
      {
        firstname : new FormControl('', Validators.required),
        lastname : new FormControl('', Validators.required),
        regno : new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
        address : new FormControl('', Validators.required),
        dob : new FormControl('', Validators.required),
        contact : new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        email : new FormControl('', [Validators.required, Validators.email]),
        al : new FormControl(''),
        ol : new FormControl(''),
        house : new FormControl('', Validators.required),
        awards : new FormControl(''),
        contribution : new FormControl(''),
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.compose([Validators.required, this.customvalidator.patternValidator()])),
        confirmpassword : new FormControl('', Validators.required),
      },
      {validator: this.customvalidator.MatchPassword('password', 'confirmpassword')})

      this.edituserform = this.fb.group(
        {
          firstname : new FormControl('', Validators.required),
          lastname : new FormControl('', Validators.required),
          regno : new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
          address : new FormControl('', Validators.required),
          dob : new FormControl('', Validators.required),
          contact : new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
          email : new FormControl('', [Validators.required, Validators.email]),
          al : new FormControl(''),
          ol : new FormControl(''),
          house : new FormControl('', Validators.required),
          awards : new FormControl(''),
          contribution : new FormControl(''),
          username : new FormControl('', Validators.required)
        })
  }

  addUser(){

    const firstname = this.adduserform.value.firstname;
    const lastname = this.adduserform.value.lastname; 
    const address = this.adduserform.value.address;
    const regno = this.adduserform.value.regno;
    const dob = this.adduserform.value.dob;
    const contact = this.adduserform.value.contact;
    const email = this.adduserform.value.email;
    const al = this.adduserform.value.al;
    const ol = this.adduserform.value.ol;
    const house = this.adduserform.value.house;
    const awards = this.adduserform.value.awards;
    const contribution = this.adduserform.value.contribution;
    const username = this.adduserform.value.username;
    const password = this.adduserform.value.password;
   
    
    const student = <Student>{ firstname:firstname,lastname:lastname, regno:regno,
    address:address, dob:dob, contact:contact, email:email, al:al, ol:ol, house:house, awards:awards, 
    contribution:contribution, username: username, password: password};

      const studentdetails = this.datastore.getItem('students') || []; 
      const emailExists = studentdetails.some((students: { email: any; }) => students.email === email);
      const regnoexist = studentdetails.some((students: { regno: any; }) => students.regno === regno);
      const usernameexist = studentdetails.some((students: { username: any; }) => students.username === username);
      
    // if(this.adduserform.valid)
    // {
      if (!emailExists && !regnoexist && !usernameexist) {
          studentdetails.push(student);
          this.datastore.setItem('students', studentdetails);  
          this.successalert = 'Successfully added !'+username;
          this.adduserform.reset();
      }
      else{

        if(emailExists){
          this.failurealert = 'Invalid register , Email already exists!';
        }
        else if(regnoexist){
          this.failurealert = 'Invalid register registration number already exists!';
        }
        else if(usernameexist){
          this.failurealert = 'Invalid register username number already exists!';
        }
        else{
          this.failurealert = 'Invalid register!';
        }
        this.adduserform.reset();
        
      }
      
    // }
  }
  

  get addUserForm()
  {
    return this.adduserform.controls;
  }

  // addStudents(){
  //   this.addstudentpage = true;
  // }

  students:any[]=[];

  viewStudents(){

    //this.viewtable=true;

    const studenttable = this.datastore.getItem('students') || []; 
    for(var i=0; i<studenttable.length; i++){
      this.students[i]=studenttable[i];
    }
  }

  stu:any[]=[];

  firstname! : string;
  lastname! : string;
  address! : string;
  regno! : number;
  dob! : Date;
  contact! : number;
  email! : string;
  al! : string;
  ol! : string;
  house! : string;
  awards ! : string;
  contribution! : string;
  username! : string;
  
  editstudent(regno:number){
    // this.editstudentview=true;
    var filterstudent = this.students.filter((item: { regno: any; }) => item.regno === regno) 
    for (var i = 0; i < filterstudent.length; i++) {
      this.firstname = filterstudent[i].firstname;
      this.lastname = filterstudent[i].lastname;
      this.address = filterstudent[i].address;
      this.regno = filterstudent[i].regno;
      this.dob = filterstudent[i].dob;
      this.contact = filterstudent[i].contact;
      this.email = filterstudent[i].email;
      this.al = filterstudent[i].al;
      this.ol = filterstudent[i].ol;
      this.house = filterstudent[i].house;
      this.awards = filterstudent[i].awards;
      this.contribution = filterstudent[i].contribution;
      this.username = filterstudent[i].username;

    }
  }

  update(){

        const firstname = this.edituserform.value.firstname;
        const lastname = this.edituserform.value.lastname; 
        const address = this.edituserform.value.address;
        const regno = this.edituserform.value.regno;
        const dob = this.edituserform.value.dob;
        const contact = this.edituserform.value.contact;
        const email = this.edituserform.value.email;
        const al = this.edituserform.value.al;
        const ol = this.edituserform.value.ol;
        const house = this.edituserform.value.house;
        const awards = this.edituserform.value.awards;
        const contribution = this.edituserform.value.contribution;
        const username = this.edituserform.value.username;

        const currentItems = this.datastore.getItem('register') || [];
        const student = this.datastore.getItem('students') || [];
        const index = currentItems.findIndex((item: any) => item.regno == regno);
        const studentindex = student.findIndex((item: any) => item.regno == regno);
    
            
          // if(this.edituserform.valid)
          // {
            // if(studentindex !== -1 && student[studentindex].regno === currentItems[index].regno)
            const regnoexists = student.some((item: { regno: any; }) => item.regno === regno);
            const usernmaeexist = student.some((item: { username: any; }) => item.username === username);
            if(studentindex !== -1 && regnoexists)
            { 
             
              
              // if(!regnoexists){
              //   currentItems[index].regno=regno;
              //   student[studentindex].regno=regno;
              // }
              // else{
              //   this.failurealert='Student register number alraedy exists!';
              // }
              // if(!usernmaeexist){
              //   student[studentindex].username=username;
              // currentItems[index].username=username;
              // }
              // else{
              //   this.failurealert='Student username alraedy exists!';
              // }
              
              if(student[studentindex].email!=email){
                const emailexist = student.some((item: { email: any; }) => item.email === email); 
                if(!emailexist){
                  student[studentindex].email=email;
                  currentItems[index].email=email;
                }
                else{
                  this.editfailurealert='Student email alraedy exists!';
                  return;
                }
              }
              student[studentindex].firstname=firstname;
              student[studentindex].lastname=lastname;
              student[studentindex].address=address;
              student[studentindex].dob=dob;
              student[studentindex].contact=contact;
              student[studentindex].al=al;
              student[studentindex].ol=ol;
              student[studentindex].house=house;
              student[studentindex].awards=awards;
              student[studentindex].contribution=contribution;
              localStorage.setItem('register', JSON.stringify(currentItems));
              localStorage.setItem('students', JSON.stringify(student));
              this.editsuccessalert = 'You have successfully updated '+student[studentindex].username+' details!';
              this.edituserform.reset();
            }
            else{
                this.editfailurealert = 'Invalid Edit!';
                this.edituserform.reset();
            }
            
          // }
  }

  get edit(){
    return this.edituserform.controls;
  }

  delete(regno:number){
    const studentdetails = this.datastore.getItem('students') || []; 
    const studentregister = this.datastore.getItem('register') || []; 
    const studentindex = studentdetails.findIndex((item: any) => item.regno == regno);
    const registerindex = studentregister.findIndex((item: any) => item.regno == regno);

    if (studentindex !== -1) {
      studentdetails.splice(studentindex, 1);
      studentregister.splice(registerindex, 1)
      localStorage.setItem('students', JSON.stringify(studentdetails));
      localStorage.setItem('register', JSON.stringify(studentregister));
      this.deletesuccessalert = 'Successfully deleted'
    }
    else{
      this.deletefailurealert = 'Student not found';
    }
  }
}
