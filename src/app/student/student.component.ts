import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HandledataService } from '../handledata.service';
import { Student } from './../student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  

  message:string = '';
  user:string='';
  view: boolean | undefined;
  email:string='';
  regno!:number;

  constructor(private sharedService: SharedService,  private dataService:HandledataService) {
    this.sharedService.currentMessage.subscribe(message => this.message = message)
    this.sharedService.user.subscribe(name => this.user = name)
    this.sharedService.view.subscribe(viewdetails => this.view = viewdetails)
    this.sharedService.useremail.subscribe(usermail=>this.email=usermail)
    /* this.dataService.Student$.subscribe(data=>this.student=data)
    console.log(this.student)
    this.student1 = this.student[0];
    console.log(this.student1[0].regno)*/
    this.dataService.Regno$.subscribe(data=>this.regno=data)
  }

  // currentItems = this.dataService.getItem('items') || [];
  students = this.dataService.getItem('students')||[];
  // filterdata = this.currentItems.filter((item: { username: any; }) => item.username == this.user)
    firstname='';
    lastname='';
    dob='';
    contact='';
    address='';
    al='';
    ol='';
    awards='';
    contribution='';
    house='';

  ngOnInit(): void {

    var filterstudent = this.students.filter((item: { regno: any; }) => item.regno === this.regno) 
    for (var i = 0; i < filterstudent.length; i++) {
      if(this.user == filterstudent[i].username){
      this.firstname = filterstudent[i].firstname;
      this.lastname = filterstudent[i].lastname;
      this.dob = filterstudent[i].dob;
      this.contact = filterstudent[i].contact;
      this.address = filterstudent[i].address;
      this.al=filterstudent[i].al;
      this.ol=filterstudent[i].ol;
      this.awards=filterstudent[i].awards;
      this.contribution=filterstudent[i].contribution;
      this.house=filterstudent[i].house;
    }}
    
    // var filterdata = this.currentItems.filter((item: { username: any; }) => item.username === this.user) 
    // for (var i = 0; i < filterdata.length; i++) {
    //   if(this.user == filterdata[i].username){
    //   this.firstname = filterdata[i].firstname;
    //   this.lastname = filterdata[i].lastname;
    //   this.dob = filterdata[i].dob;
    //   this.contact = filterdata[i].contact;
    //   this.address = filterdata[i].address;
    // }}
    
      // this.dataService.Student$.subscribe(data => {
      //   this.student = data;
      //   if (this.student && this.student.length > 0) {
      //     this.student1 = this.student[0];
      //     console.log(this.student1);
      //     console.log(this.student1[0].regno);
      //   }
      // });
    
 }
  

}
