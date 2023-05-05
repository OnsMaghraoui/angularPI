import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreditDemandComponent } from './client-credit-demand.component';

describe('ClientCreditDemandComponent', () => {
  let component: ClientCreditDemandComponent;
  let fixture: ComponentFixture<ClientCreditDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCreditDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCreditDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
