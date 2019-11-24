import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TXSearchResultsComponent } from './TXSearchResults.component';
import {TXSearchResultsRoutingModule} from './TXSearchResults-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TXSearchResultsRoutingModule,
    SharedModule
  ],
  declarations: [TXSearchResultsComponent]
})
export class TXSearchResultsModule { }
