import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalesPropertyComponent } from './update-sales-property.component';

describe('UpdateSalesPropertyComponent', () => {
  let component: UpdateSalesPropertyComponent;
  let fixture: ComponentFixture<UpdateSalesPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalesPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSalesPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
