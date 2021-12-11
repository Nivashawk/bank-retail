import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCalculatorComponent } from './deposit-calculator.component';

describe('DepositCalculatorComponent', () => {
  let component: DepositCalculatorComponent;
  let fixture: ComponentFixture<DepositCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
