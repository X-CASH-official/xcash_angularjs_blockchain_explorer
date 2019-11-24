import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHexadecimalTXComponent } from './SendHexadecimalTX.component';

describe('SendHexadecimalTXComponent', () => {
  let component: SendHexadecimalTXComponent;
  let fixture: ComponentFixture<SendHexadecimalTXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendHexadecimalTXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHexadecimalTXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
