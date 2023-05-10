import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HandledataService } from '../handledata.service';

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

  constructor(private sharedService: SharedService,  private dataService:HandledataService) {
    this.sharedService.currentMessage.subscribe(message => this.message = message)
    this.sharedService.user.subscribe(name => this.user = name)
    this.sharedService.view.subscribe(viewdetails => this.view = viewdetails)
    this.sharedService.useremail.subscribe(usermail=>this.email=usermail)
  }

  currentItems = this.dataService.getItem('items') || [];
  // filterdata = this.currentItems.filter((item: { username: any; }) => item.username == this.user)
   firstname='';
   lastname='';
   dob='';
  contact='';
  address='';
  ngOnInit(): void {

    
    var filterdata = this.currentItems.filter((item: { username: any; }) => item.username === this.user) 
    for (var i = 0; i < filterdata.length; i++) {
      if(this.user == filterdata[i].username){
      this.firstname = filterdata[i].firstname;
      this.lastname = filterdata[i].lastname;
      this.dob = filterdata[i].dob;
      this.contact = filterdata[i].contact;
      this.address = filterdata[i].address;
    }}
 }
  

}
