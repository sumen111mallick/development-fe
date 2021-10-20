import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailsModalComponent } from './property-details-modal.component';

describe('PropertyDetailsModalComponent', () => {
  let component: PropertyDetailsModalComponent;
  let fixture: ComponentFixture<PropertyDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
