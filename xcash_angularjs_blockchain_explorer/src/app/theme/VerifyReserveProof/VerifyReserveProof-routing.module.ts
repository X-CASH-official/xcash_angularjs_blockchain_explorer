import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VerifyReserveProofComponent} from './VerifyReserveProof.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyReserveProofComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyReserveProofRoutingModule { }
