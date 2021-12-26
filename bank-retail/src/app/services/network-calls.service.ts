import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkCallsService {
  constructor(private httpClient: HttpClient, private router: Router, private CommonService: CommonService) {}
  baseUrl = environment.baseUrl; //Rset API base URL
  result: any;

  getURL() {
    return this.baseUrl;
  }

  // login API
  callLoginApi(Account_Number: number, Password: string) {
    let url = this.baseUrl + '/admin/login';
    this.httpClient
      .post(
        url,
        {
          Account_Number: Account_Number,
          Password: Password,
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          console.log(data['code']);
          if (data['code'] == 200) {
            sessionStorage.setItem("Account_number", data['result']);
            sessionStorage.setItem("login", "1");
            this.router.navigate(['home']);
          }
          else{
            alert(data['message'])
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }

  // register API
  callRegisterApi(
    First_Name: string,
    Last_Name: string,
    Account_Number: number,
    Aadhar_Number: string,
    Pan_Number: string,
    Password: string
  ) {
    let url = this.baseUrl + '/admin/create';
    this.httpClient
      .post(
        url,
        {
          First_Name,
          Last_Name,
          Account_Number,
          Aadhar_Number,
          Pan_Number,
          Password,
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          console.log(data['code']);
          if (data['code'] == 200) {
            this.router.navigate(['']);
          }
          else{
            alert(data['message'])
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }

  // details API
  callDetailsApi(
    Account_Number: number,
  ) {
    let url = this.baseUrl + '/admin/detail';
    this.httpClient
      .post(
        url,
        {
          Account_Number
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          console.log(data['code']);
          if (data['code'] == 200) {
            sessionStorage.setItem("balance", data['result']);
            
            // window.location.reload()
          }
          else{
            alert(data['message'])
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }


  // fund API

  callFundApi(
    Receiver_Account_Number: number,
    amount: number
  ) {
    let url = this.baseUrl + '/admin/fund';
    this.httpClient
      .post(
        url,
        {
          current_user_account_number : parseInt(sessionStorage.getItem("Account_number")!),
          receiver_user_account_number : Receiver_Account_Number,
          Total_Balance : amount
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          console.log(data['code']);
          if (data['code'] == 200) {
            this.callDetailsApi(parseInt(sessionStorage.getItem("Account_number")!))
            alert("fund transfered successfully")
            parseInt(sessionStorage.getItem("Account_number")!)
            window.location.reload()
          }
          else{
            alert(data['message'])
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }

}
