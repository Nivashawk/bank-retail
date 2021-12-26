import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { FundTransferComponent } from './pages/fund-transfer/fund-transfer.component';
import { DepositCalculatorComponent } from './pages/deposit-calculator/deposit-calculator.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent},
  {path:"fund-transfer",component:FundTransferComponent},
  {path:"deposit",component:DepositCalculatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  FundTransferComponent,
  DepositCalculatorComponent
];
