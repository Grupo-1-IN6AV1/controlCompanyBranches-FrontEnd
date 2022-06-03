import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCompanyComponent } from './products-company.component';

describe('ProductsCompanyComponent', () => {
  let component: ProductsCompanyComponent;
  let fixture: ComponentFixture<ProductsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
