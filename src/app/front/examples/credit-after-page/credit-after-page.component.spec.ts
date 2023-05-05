import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAfterPageComponent } from './credit-after-page.component';

describe('CreditAfterPageComponent', () => {
  let component: CreditAfterPageComponent;
  let fixture: ComponentFixture<CreditAfterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditAfterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditAfterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
