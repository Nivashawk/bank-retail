import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkCallsService } from '../../services/network-calls.service';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css'],
})
export class FundTransferComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private networkcall: NetworkCallsService
  ) {}

  // variable initializing
  // public login_form: FormGroup;
  public fund_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  Acc_number: number;
  amount: number;
  balance: number;

  // functions
  onSubmit() {
    if (!this.fund_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;

      this.Acc_number = this.fund_form.get('Account_number')!.value;
      this.amount = this.fund_form.get('Amount')!.value;

      this.networkcall.callFundApi(this.Acc_number, this.amount);
      
    } else {
      this.submitError = true;
    }
  }

  

  ngOnInit(): void {
    // form starts here
    this.balance = parseInt(sessionStorage.getItem("balance")!)
    this.fund_form = this.fb.group({
      Account_number: new FormControl('', [Validators.required]),
      Amount: new FormControl('', [Validators.required]),
    });
  }
}
