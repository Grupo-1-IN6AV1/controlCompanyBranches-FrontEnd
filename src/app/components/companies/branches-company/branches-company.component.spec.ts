import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesCompanyComponent } from './branches-company.component';

describe('BranchesCompanyComponent', () => {
  let component: BranchesCompanyComponent;
  let fixture: ComponentFixture<BranchesCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchesCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
