import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComtactPageFormComponent } from './comtact-page-form.component';

describe('ComtactPageFormComponent', () => {
  let component: ComtactPageFormComponent;
  let fixture: ComponentFixture<ComtactPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComtactPageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComtactPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
