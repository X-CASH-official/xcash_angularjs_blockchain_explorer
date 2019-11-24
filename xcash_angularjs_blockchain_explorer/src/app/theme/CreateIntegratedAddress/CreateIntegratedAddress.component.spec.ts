import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntegratedAddressComponent } from './CreateIntegratedAddress.component';

describe('CreateIntegratedAddressComponent', () => {
  let component: CreateIntegratedAddressComponent;
  let fixture: ComponentFixture<CreateIntegratedAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIntegratedAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIntegratedAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
