import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesimonialFormComponent } from './tesimonial-form.component';

describe('TesimonialFormComponent', () => {
  let component: TesimonialFormComponent;
  let fixture: ComponentFixture<TesimonialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesimonialFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesimonialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
