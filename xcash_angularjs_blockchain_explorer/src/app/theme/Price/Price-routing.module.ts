import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PriceComponent} from './Price.component';

const routes: Routes = [
  {
    path: '',
    component: PriceComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRoutingModule { }
