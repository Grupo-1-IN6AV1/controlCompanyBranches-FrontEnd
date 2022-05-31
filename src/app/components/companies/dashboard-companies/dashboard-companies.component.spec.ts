import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompaniesComponent } from './dashboard-companies.component';

describe('DashboardCompaniesComponent', () => {
  let component: DashboardCompaniesComponent;
  let fixture: ComponentFixture<DashboardCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
