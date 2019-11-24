import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExplorerComponent} from './Explorer.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorerComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule { }
