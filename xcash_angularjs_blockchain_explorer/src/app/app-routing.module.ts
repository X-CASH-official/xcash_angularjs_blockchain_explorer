import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'Explorer',
        pathMatch: 'full'
      },
      {
        path: 'TXPool',
        loadChildren: './theme/TXPool/TXPool.module#TXPoolModule'
      },
      {
        path: 'Explorer',
        loadChildren: './theme/Explorer/Explorer.module#ExplorerModule'
      },
      {
        path: 'DecodeTX',
        loadChildren: './theme/DecodeTX/DecodeTX.module#DecodeTXModule'
      },
      {
        path: 'VerifySender',
        loadChildren: './theme/VerifySender/VerifySender.module#VerifySenderModule'
      },
      {
        path: 'VerifyReserveProof',
        loadChildren: './theme/VerifyReserveProof/VerifyReserveProof.module#VerifyReserveProofModule'
      },
      {
        path: 'CreateIntegratedAddress',
        loadChildren: './theme/CreateIntegratedAddress/CreateIntegratedAddress.module#CreateIntegratedAddressModule'
      },
      {
        path: 'SendHexadecimalTX',
        loadChildren: './theme/SendHexadecimalTX/SendHexadecimalTX.module#SendHexadecimalTXModule'
      },
      {
        path: 'SegregatedFunds',
        loadChildren: './theme/SegregatedFunds/SegregatedFunds.module#SegregatedFundsModule'
      },
      {
        path: 'NodesList',
        loadChildren: './theme/NodesList/NodesList.module#NodesListModule'
      },
      {
        path: 'Price',
        loadChildren: './theme/Price/Price.module#PriceModule'
      },
      {
        path: 'API',
        loadChildren: './theme/API/API.module#APIModule'
      },
      {
        path: 'Statistics',
        loadChildren: './theme/Statistics/Statistics.module#StatisticsModule'
      },
      {
        path: 'Block',
        loadChildren: './theme/Block/Block.module#BlockModule'
      },
      {
        path: 'BlockRewardTransaction',
        loadChildren: './theme/BlockRewardTransaction/BlockRewardTransaction.module#BlockRewardTransactionModule'
      },
      {
        path: 'Transaction',
        loadChildren: './theme/Transaction/Transaction.module#TransactionModule'
      },
      {
        path: 'TXSearchResults',
        loadChildren: './theme/TXSearchResults/TXSearchResults.module#TXSearchResultsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
