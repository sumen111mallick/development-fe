import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertselectorComponent } from './insertselector.component';

describe('InsertselectorComponent', () => {
  let component: InsertselectorComponent;
  let fixture: ComponentFixture<InsertselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertselectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
