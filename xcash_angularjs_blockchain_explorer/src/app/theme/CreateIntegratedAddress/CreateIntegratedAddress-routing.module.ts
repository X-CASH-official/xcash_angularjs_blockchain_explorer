import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateIntegratedAddressComponent} from './CreateIntegratedAddress.component';

const routes: Routes = [
  {
    path: '',
    component: CreateIntegratedAddressComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateIntegratedAddressRoutingModule { }
