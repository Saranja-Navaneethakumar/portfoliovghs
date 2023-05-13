import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login: boolean | undefined;
  adminstatus: boolean | undefined;
  visible:boolean | undefined;
  constructor(private sharedService: SharedService) { 
    
  }

  ngOnInit(): void {
    this.sharedService.login.subscribe(state => this.login = state)
    this.sharedService.adminstate.subscribe(data => this.adminstatus = data)
    this.sharedService.hidev.subscribe(data => this.visible = data)
    // console.log(this.adminstatus)
  }

  onview()
  {
    this.sharedService.setviewdetails(true);
  }

  onLogout()
  {
    this.sharedService.setloginstate(false);
  }

  adminpanel()
  {
    this.sharedService.setadminview(true);
  }
}

