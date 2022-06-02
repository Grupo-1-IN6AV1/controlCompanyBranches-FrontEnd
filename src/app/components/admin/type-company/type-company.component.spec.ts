import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCompanyComponent } from './type-company.component';

describe('TypeCompanyComponent', () => {
  let component: TypeCompanyComponent;
  let fixture: ComponentFixture<TypeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
