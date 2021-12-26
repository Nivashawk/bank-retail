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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private networkcall: NetworkCallsService
  ) {}

  // variable initializing
  // public login_form: FormGroup;
  public login_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  Acc_number: number;
  Pass: string;
  result: any;

  // functions

  onSubmit() {
    if (!this.login_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      console.log(this.login_form);

      this.Acc_number = this.login_form.get('Account_number')!.value;
      this.Pass = this.login_form.get('Password')!.value;
      console.log('params =>', this.Acc_number, this.Pass);

      this.networkcall.callLoginApi(this.Acc_number, this.Pass);
    } else {
      this.submitError = true;
    }
  }

  route_to_register() {
    this.router.navigate(['register']);
  }

  ngOnInit(): void {
    // form starts here

    this.login_form = this.fb.group({
      Account_number: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }
}
