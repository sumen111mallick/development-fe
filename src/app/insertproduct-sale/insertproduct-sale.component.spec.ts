import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertproductSaleComponent } from './insertproduct-sale.component';

describe('InsertproductSaleComponent', () => {
  let component: InsertproductSaleComponent;
  let fixture: ComponentFixture<InsertproductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertproductSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertproductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
