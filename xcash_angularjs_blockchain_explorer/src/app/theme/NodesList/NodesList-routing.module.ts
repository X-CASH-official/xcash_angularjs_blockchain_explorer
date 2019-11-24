import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NodesListComponent} from './NodesList.component';

const routes: Routes = [
  {
    path: '',
    component: NodesListComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodesListRoutingModule { }
