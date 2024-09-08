import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductDistributorComponent } from './show-product-distributor.component';

describe('ShowProductDistributorComponent', () => {
  let component: ShowProductDistributorComponent;
  let fixture: ComponentFixture<ShowProductDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowProductDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
