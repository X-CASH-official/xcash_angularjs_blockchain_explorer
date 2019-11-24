import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyReserveProofComponent } from './VerifyReserveProof.component';

describe('VerifyReserveProofComponent', () => {
  let component: VerifyReserveProofComponent;
  let fixture: ComponentFixture<VerifyReserveProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyReserveProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyReserveProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
