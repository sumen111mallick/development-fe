import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedsearchesComponent } from './savedsearches.component';

describe('SavedsearchesComponent', () => {
  let component: SavedsearchesComponent;
  let fixture: ComponentFixture<SavedsearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedsearchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedsearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
