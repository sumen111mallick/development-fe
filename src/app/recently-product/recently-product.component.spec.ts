import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyProductComponent } from './recently-product.component';

describe('RecentlyProductComponent', () => {
  let component: RecentlyProductComponent;
  let fixture: ComponentFixture<RecentlyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
