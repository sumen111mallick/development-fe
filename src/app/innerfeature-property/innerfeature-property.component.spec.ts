import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerfeaturePropertyComponent } from './innerfeature-property.component';

describe('InnerfeaturePropertyComponent', () => {
  let component: InnerfeaturePropertyComponent;
  let fixture: ComponentFixture<InnerfeaturePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerfeaturePropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerfeaturePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
