import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCompaniesComponent } from './body-companies.component';

describe('BodyCompaniesComponent', () => {
  let component: BodyCompaniesComponent;
  let fixture: ComponentFixture<BodyCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
