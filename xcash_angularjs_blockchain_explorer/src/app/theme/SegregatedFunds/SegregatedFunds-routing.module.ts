import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SegregatedFundsComponent} from './SegregatedFunds.component';

const routes: Routes = [
  {
    path: '',
    component: SegregatedFundsComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegregatedFundsRoutingModule { }
