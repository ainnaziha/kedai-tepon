import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentErrorComponent } from './payment-error.component';

describe('PaymentErrorComponent', () => {
  let component: PaymentErrorComponent;
  let fixture: ComponentFixture<PaymentErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentErrorComponent]
    });
    fixture = TestBed.createComponent(PaymentErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
