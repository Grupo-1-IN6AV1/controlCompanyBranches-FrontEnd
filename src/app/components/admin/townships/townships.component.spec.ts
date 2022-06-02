import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownshipsComponent } from './townships.component';

describe('TownshipsComponent', () => {
  let component: TownshipsComponent;
  let fixture: ComponentFixture<TownshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
