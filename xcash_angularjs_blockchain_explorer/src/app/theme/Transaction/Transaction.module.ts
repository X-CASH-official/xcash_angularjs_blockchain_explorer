import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './Transaction.component';
import {TransactionRoutingModule} from './Transaction-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ],
  declarations: [TransactionComponent]
})
export class TransactionModule { }
