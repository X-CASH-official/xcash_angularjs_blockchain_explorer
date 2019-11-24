import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TXPoolComponent } from './TXPool.component';

describe('TXPoolComponent', () => {
  let component: TXPoolComponent;
  let fixture: ComponentFixture<TXPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TXPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TXPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
