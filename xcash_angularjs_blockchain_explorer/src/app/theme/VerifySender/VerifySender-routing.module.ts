import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VerifySenderComponent} from './VerifySender.component';

const routes: Routes = [
  {
    path: '',
    component: VerifySenderComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifySenderRoutingModule { }
