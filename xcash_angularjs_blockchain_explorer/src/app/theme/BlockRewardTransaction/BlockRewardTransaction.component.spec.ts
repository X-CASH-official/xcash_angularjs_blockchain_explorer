import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRewardTransactionComponent } from './BlockRewardTransaction.component';

describe('BlockRewardTransactionComponent', () => {
  let component: BlockRewardTransactionComponent;
  let fixture: ComponentFixture<BlockRewardTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRewardTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRewardTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
