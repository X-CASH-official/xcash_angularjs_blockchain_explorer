import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySenderComponent } from './VerifySender.component';

describe('VerifySenderComponent', () => {
  let component: VerifySenderComponent;
  let fixture: ComponentFixture<VerifySenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifySenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
