import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProductsCompanyComponent } from './sales-products-company.component';

describe('SalesProductsCompanyComponent', () => {
  let component: SalesProductsCompanyComponent;
  let fixture: ComponentFixture<SalesProductsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesProductsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProductsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
