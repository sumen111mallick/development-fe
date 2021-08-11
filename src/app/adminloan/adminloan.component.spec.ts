import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloanComponent } from './adminloan.component';

describe('AdminloanComponent', () => {
  let component: AdminloanComponent;
  let fixture: ComponentFixture<AdminloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
