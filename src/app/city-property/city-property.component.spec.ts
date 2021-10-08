import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPropertyComponent } from './city-property.component';

describe('CityPropertyComponent', () => {
  let component: CityPropertyComponent;
  let fixture: ComponentFixture<CityPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
