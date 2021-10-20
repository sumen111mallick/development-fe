import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaymentComponent } from './product-payment.component';

describe('ProductPaymentComponent', () => {
  let component: ProductPaymentComponent;
  let fixture: ComponentFixture<ProductPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
