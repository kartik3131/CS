import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDistributorComponent } from './register-distributor.component';

describe('RegisterDistributorComponent', () => {
  let component: RegisterDistributorComponent;
  let fixture: ComponentFixture<RegisterDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
