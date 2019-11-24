import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DecodeTXComponent} from './DecodeTX.component';

const routes: Routes = [
  {
    path: '',
    component: DecodeTXComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecodeTXRoutingModule { }
