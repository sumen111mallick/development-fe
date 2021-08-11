import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerpageComponent } from './lawyerpage.component';

describe('LawyerpageComponent', () => {
  let component: LawyerpageComponent;
  let fixture: ComponentFixture<LawyerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
