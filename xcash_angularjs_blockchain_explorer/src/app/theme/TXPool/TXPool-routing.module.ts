import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TXPoolComponent} from './TXPool.component';

const routes: Routes = [
  {
    path: '',
    component: TXPoolComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TXPoolRoutingModule { }
