import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDemandComponent } from './credit-demand.component';

describe('CreditDemandComponent', () => {
  let component: CreditDemandComponent;
  let fixture: ComponentFixture<CreditDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
