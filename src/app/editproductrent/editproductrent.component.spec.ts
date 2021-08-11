import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductrentComponent } from './editproductrent.component';

describe('EditproductrentComponent', () => {
  let component: EditproductrentComponent;
  let fixture: ComponentFixture<EditproductrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditproductrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
