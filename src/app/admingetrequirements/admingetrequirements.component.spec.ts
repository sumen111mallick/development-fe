import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingetrequirementsComponent } from './admingetrequirements.component';

describe('AdmingetrequirementsComponent', () => {
  let component: AdmingetrequirementsComponent;
  let fixture: ComponentFixture<AdmingetrequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingetrequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingetrequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
