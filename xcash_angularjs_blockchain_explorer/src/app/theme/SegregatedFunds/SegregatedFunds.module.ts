import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegregatedFundsComponent } from './SegregatedFunds.component';
import {SegregatedFundsRoutingModule} from './SegregatedFunds-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SegregatedFundsRoutingModule,
    SharedModule
  ],
  declarations: [SegregatedFundsComponent]
})
export class SegregatedFundsModule { }
