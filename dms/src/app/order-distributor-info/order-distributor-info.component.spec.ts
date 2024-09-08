import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDistributorInfoComponent } from './order-distributor-info.component';

describe('OrderDistributorInfoComponent', () => {
  let component: OrderDistributorInfoComponent;
  let fixture: ComponentFixture<OrderDistributorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDistributorInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDistributorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
