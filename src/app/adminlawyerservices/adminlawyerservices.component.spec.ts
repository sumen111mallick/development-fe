import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlawyerservicesComponent } from './adminlawyerservices.component';

describe('AdminlawyerservicesComponent', () => {
  let component: AdminlawyerservicesComponent;
  let fixture: ComponentFixture<AdminlawyerservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminlawyerservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlawyerservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
