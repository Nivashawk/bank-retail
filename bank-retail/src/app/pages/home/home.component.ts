import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkCallsService } from '../../services/network-calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private networkcall: NetworkCallsService) { }

    public balance:number

    // functions

    route_to_fund() {
      this.router.navigate(['fund-transfer']);
    }

    route_to_deposy() {
      this.router.navigate(['deposit']);
    }

    check_balance() {
      window.location.reload()
      this.balance = parseInt(sessionStorage.getItem("balance")!)
    }

     

  ngOnInit(): void {
    if(sessionStorage.getItem("login") === "1"){
      this.networkcall.callDetailsApi(parseInt(sessionStorage.getItem("Account_number")!));
    }
    else{
      this.router.navigate(['']);
    }
  }
}
