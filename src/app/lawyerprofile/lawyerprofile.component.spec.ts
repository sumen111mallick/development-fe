import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerprofileComponent } from './lawyerprofile.component';

describe('LawyerprofileComponent', () => {
  let component: LawyerprofileComponent;
  let fixture: ComponentFixture<LawyerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
