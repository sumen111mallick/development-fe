import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancalcComponent } from './loancalc.component';

describe('LoancalcComponent', () => {
  let component: LoancalcComponent;
  let fixture: ComponentFixture<LoancalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoancalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
