import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetComponentsAdminComponent } from './set-components-admin.component';

describe('SetComponentsAdminComponent', () => {
  let component: SetComponentsAdminComponent;
  let fixture: ComponentFixture<SetComponentsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetComponentsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetComponentsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
