import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerserviceComponent } from './lawyerservice.component';

describe('LawyerserviceComponent', () => {
  let component: LawyerserviceComponent;
  let fixture: ComponentFixture<LawyerserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
