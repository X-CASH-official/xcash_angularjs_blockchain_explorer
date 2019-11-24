import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SendHexadecimalTXComponent} from './SendHexadecimalTX.component';

const routes: Routes = [
  {
    path: '',
    component: SendHexadecimalTXComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendHexadecimalTXRoutingModule { }
