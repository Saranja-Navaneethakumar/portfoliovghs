import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login: boolean | undefined;
  constructor(private sharedService: SharedService) { 
    
  }

  ngOnInit(): void {
    this.sharedService.login.subscribe(state => this.login = state)
  }

  onview()
  {
    this.sharedService.setviewdetails(true);
  }

  onLogout()
  {
    this.sharedService.setloginstate(false);
  }

}

