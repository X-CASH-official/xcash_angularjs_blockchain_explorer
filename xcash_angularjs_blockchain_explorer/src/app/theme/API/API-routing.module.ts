import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APIComponent} from './API.component';

const routes: Routes = [
  {
    path: '',
    component: APIComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APIRoutingModule { }
