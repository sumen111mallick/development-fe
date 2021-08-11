import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingetproductComponent } from './admingetproduct.component';

describe('AdmingetproductComponent', () => {
  let component: AdmingetproductComponent;
  let fixture: ComponentFixture<AdmingetproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingetproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingetproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
