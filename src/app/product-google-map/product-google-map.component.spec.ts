import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGoogleMapComponent } from './product-google-map.component';

describe('ProductGoogleMapComponent', () => {
  let component: ProductGoogleMapComponent;
  let fixture: ComponentFixture<ProductGoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGoogleMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
