import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegregatedFundsComponent } from './SegregatedFunds.component';

describe('SegregatedFundsComponent', () => {
  let component: SegregatedFundsComponent;
  let fixture: ComponentFixture<SegregatedFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregatedFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegregatedFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
