import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesAdminComponent } from './branches-admin.component';

describe('BranchesAdminComponent', () => {
  let component: BranchesAdminComponent;
  let fixture: ComponentFixture<BranchesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
