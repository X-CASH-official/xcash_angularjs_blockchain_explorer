import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlockRewardTransactionComponent} from './BlockRewardTransaction.component';

const routes: Routes = [
  {
    path: '',
    component: BlockRewardTransactionComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRewardTransactionRoutingModule { }
