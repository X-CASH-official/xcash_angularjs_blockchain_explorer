import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateIntegratedAddressComponent } from './CreateIntegratedAddress.component';
import {CreateIntegratedAddressRoutingModule} from './CreateIntegratedAddress-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CreateIntegratedAddressRoutingModule,
    SharedModule
  ],
  declarations: [CreateIntegratedAddressComponent]
})
export class CreateIntegratedAddressModule { }
