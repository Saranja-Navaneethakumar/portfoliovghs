import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  

  message:string = '';
  user:string='';
  
  constructor(private sharedService: SharedService) {
    this.sharedService.currentMessage.subscribe(message => this.message = message)
    this.sharedService.user.subscribe(name => this.user = name)
  }

  ngOnInit(): void {

    
  }

}
