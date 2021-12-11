import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-deposit-calculator',
  templateUrl: './deposit-calculator.component.html',
  styleUrls: ['./deposit-calculator.component.css'],
})
export class DepositCalculatorComponent implements OnInit {
  constructor(public fb: FormBuilder) {}

  // variable initializing
  // public login_form: FormGroup;
  public deposit_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  balance: number;
  Principal: any;
  Interest_Rate: any;
  Interest_Compounding: any;
  months: any;
  result:any;
  public calculation:any;

  // functions
  onSubmit() {
    if (!this.deposit_form.invalid) {
      console.log('submitted successfully');

      this.Principal = parseInt(this.deposit_form.get('Principal')!.value);
      this.Interest_Rate = parseInt(this.deposit_form.get('Interest_Rate')!.value);
      this.Interest_Compounding = parseInt(this.deposit_form.get(
        'Interest_Compounding'
      )!.value);
      this.months = parseInt(this.deposit_form.get('months')!.value);

      var irate = this.Interest_Rate / this.Interest_Compounding;

      console.log(this.Principal,this.Interest_Rate,this.Interest_Compounding,this.months,);
      
      const result = this.Principal * Math.pow(1 + irate / 100, (this.months / 12) * this.Interest_Compounding);
      // let result = Math.round(this.initial * (1 + this.interest) ** this.years);
      this.calculation = result.toFixed()
      console.log("result", this.calculation);
      this.submitError = false;
    } else {
      this.submitError = true;
    }
  }

  ngOnInit(): void {
    this.balance = parseInt(sessionStorage.getItem('balance')!);
    // form starts here

    this.deposit_form = this.fb.group({
      Principal: new FormControl('', [Validators.required]),
      Interest_Rate: new FormControl('', [Validators.required]),
      Interest_Compounding: new FormControl('', [Validators.required]),
      months: new FormControl('', [Validators.required]),
    });
  }
}

