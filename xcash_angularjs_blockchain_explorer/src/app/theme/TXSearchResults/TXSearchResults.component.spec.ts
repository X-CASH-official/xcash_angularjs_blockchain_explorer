import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TXSearchResultsComponent } from './TXSearchResults.component';

describe('TXSearchResultsComponent', () => {
  let component: TXSearchResultsComponent;
  let fixture: ComponentFixture<TXSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TXSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TXSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
