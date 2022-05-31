import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetComponentsComponent } from './set-components.component';

describe('SetComponentsComponent', () => {
  let component: SetComponentsComponent;
  let fixture: ComponentFixture<SetComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
