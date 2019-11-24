import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockRewardTransactionComponent } from './BlockRewardTransaction.component';
import {BlockRewardTransactionRoutingModule} from './BlockRewardTransaction-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BlockRewardTransactionRoutingModule,
    SharedModule
  ],
  declarations: [BlockRewardTransactionComponent]
})
export class BlockRewardTransactionModule { }
