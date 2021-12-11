import { Component, OnInit } from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private networkcall: NetworkCallsService
  ) {}

  // variable initializing
  // public login_form: FormGroup;
  public register_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  First_Name: string;
  Last_Name: string;
  Account_Number: number;
  Aadhar_Number: string;
  Pan_Number: string;
  Password: string;
  result: any;

  // functions
  onSubmit() {
    if (!this.register_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      this.First_Name = this.register_form.get('First_Name')!.value;
      this.Last_Name = this.register_form.get('Last_Name')!.value;
      this.Account_Number = this.register_form.get('Account_Number')!.value;
      this.Aadhar_Number = this.register_form.get('Aadhar_Number')!.value;
      this.Pan_Number = this.register_form.get('Pan_Number')!.value;
      this.Password = this.register_form.get('Password')!.value;

      this.networkcall.callRegisterApi(
        this.First_Name,
        this.Last_Name,
        this.Account_Number,
        this.Aadhar_Number,
        this.Pan_Number,
        this.Password
      );
    } else {
      this.submitError = true;
    }
  }

  ngOnInit(): void {
    // form starts here

    this.register_form = this.fb.group({
      First_Name: new FormControl('', [Validators.required]),
      Last_Name: new FormControl('', [Validators.required]),
      Account_Number: new FormControl('', [Validators.required]),
      Aadhar_Number: new FormControl('', [Validators.required]),
      Pan_Number: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }
}
