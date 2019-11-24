import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlockComponent} from './Block.component';

const routes: Routes = [
  {
    path: '',
    component: BlockComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule { }
