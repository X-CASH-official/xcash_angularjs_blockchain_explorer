import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeTXComponent } from './DecodeTX.component';

describe('DecodeTXComponent', () => {
  let component: DecodeTXComponent;
  let fixture: ComponentFixture<DecodeTXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodeTXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodeTXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
