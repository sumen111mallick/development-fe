import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertproductRentComponent } from './insertproduct-rent.component';

describe('InsertproductRentComponent', () => {
  let component: InsertproductRentComponent;
  let fixture: ComponentFixture<InsertproductRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertproductRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertproductRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
